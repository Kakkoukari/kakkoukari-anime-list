import { Listener, Subjects, OrderCreatedEvent } from "@devion/common";
import { Message } from "node-nats-streaming";
import { Anime } from "../../models/animes";
import { AnimeUpdatedPublisher } from "../publishers/anime-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "animes-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const anime = await Anime.findById(data.anime.id);

    if (!anime) {
      throw new Error("Anime not found");
    }

    anime.set({
      orderId: data.anime.id,
    });
    await anime.save();

    console.log(anime);

    await new AnimeUpdatedPublisher(this.client).publish({
      id: anime.id,
      price: anime.price,
      title: anime.title,
      userId: anime.userId,
      version: anime.version,
      orderId: anime.orderId,
    });

    msg.ack();
  }
}
