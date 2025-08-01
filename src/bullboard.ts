import { ExpressAdapter } from "@bull-board/express"
import { createBullBoard } from "@bull-board/api"
import {BullMQAdapter} from "@bull-board/api/bullMQAdapter"
import { emailQueue } from "./queue/emailQueue"

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
    queues:[new BullMQAdapter(emailQueue)],
    serverAdapter,
})

export default serverAdapter