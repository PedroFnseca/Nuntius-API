import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller("notifications")
export class NotificationsController {

  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: GetRecipientNotifications
  ){}

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string){
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string ){
    const { count } = await this.countRecipientNotification.execute({
      recipientId: recipientId
    })

    return { count }
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string){
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId: recipientId
    })

    return { 
      notifications: notifications.map(notification => {
        return NotificationViewModel.toHTPP(notification)
      })
    }
  }

  @Patch(":id/read")
  async read(@Param("id") id:string){
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(":id/unread")
  async unread(@Param("id") id:string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody){
    const { recipientId, category, content} = body;

    const { notification} = await this.sendNotification.execute({
      recipientId,
      category,
      content
    })

    return {
      notification: NotificationViewModel.toHTPP(notification)
    }
  }
}
