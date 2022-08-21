import {
  Listener,
  Subjects,
  OrderCancelledEvent,
  OrderStatus,
} from "@devion/common";
import { Message } from "node-nats-streaming";
import { Anime } from "../../models/animes";
import { AnimeUpdatedPublisher } from "../publishers/anime-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "animes-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const anime = await Anime.findById(data.anime.id);

    if (!anime) {
      throw new Error("Anime not found");
    }

    anime.set({
      status: OrderStatus.Cancelled,
      orderId: "undefined",
    });
    await anime.save();

    await new AnimeUpdatedPublisher(this.client).publish({
      id: anime._id,
      price: anime.price,
      title: anime.title,
      userId: anime.userId,
      version: anime.version,
      orderId: anime.orderId,
    });

    msg.ack();
  }
}
