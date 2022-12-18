import { Notification, NotificationProps } from "@application/entities/notification"
import { Content } from "@application/entities/content"

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}){
  return new Notification({
    category: "test",
    content: new Content("this is a test"),
    recipientId: "recipient-1",
    ...override
  })
}