import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-repositorie"
import { CancelNotification } from "./cancel-notification"
import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"

describe("Cancel notification", ()=>{
  it("should be able to send a notification", async ()=>{
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)
    
    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  })

  it("should not be able to cancel a notification when it does not exist", async () =>{
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() =>{
      return cancelNotification.execute({
        notificationId: "fake-notification-id"
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})