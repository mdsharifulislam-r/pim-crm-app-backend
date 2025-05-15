import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { TeamRoutes } from '../modules/team/team.route';
import { ContactRoutes } from '../modules/contacts/contact.route';
import { DocumentRoutes } from '../modules/document/document.route';
import { TaskRoutes } from '../modules/task/task.route';
import { CaseRoutes } from '../modules/case/case.route';
import { PersonalInfoRoutes } from '../modules/personal_info/personal_info.route';
import { InsuranceRoutes } from '../modules/insurance/insurance.route';
import { IntakeRoutes } from '../modules/intake/intake.route';
import { ProviderRoutes } from '../modules/documents/providers/provider.route';
import { ExpenseRoutes } from '../modules/documents/expenses/expense.route';
import { EvidenceRoutes } from '../modules/documents/evidence/evidence.route';
import { MedicalBillRoute } from '../modules/documents/providers/medical_bill/medical_bill.route';
import { NoteRoutes } from '../modules/notes/note.route';
import { SattlementRoutes } from '../modules/sattlement/sattalement.route';
import { ChannelRoutes } from '../modules/direct_messages/channel/channel.route';
import { MessageRoutes } from '../modules/direct_messages/message/message.route';
import { ActivityRoutes } from '../modules/activity/activity.route';
import { NotificationRoutes } from '../modules/notification/notification.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/team", route: TeamRoutes },
    {path:"/contact",route:ContactRoutes},
    {path:"/document",route:DocumentRoutes},
    {path:"/task",route:TaskRoutes},
    {path:"/case", route:CaseRoutes},
    {path:"/personal-info",route:PersonalInfoRoutes},
    {path:"/insurance",route:InsuranceRoutes},
    {path:"/intake",route:IntakeRoutes},
    {path:"/provider",route:ProviderRoutes},
    {path:"/expense",route:ExpenseRoutes},
    {path:"/evidence",route:EvidenceRoutes},
    {path:"/medical-record",route:MedicalBillRoute},
    {path:"/note",route:NoteRoutes},
    {path:"/settlement",route:SattlementRoutes},
    {path:'/channel',route:ChannelRoutes},
    {path:'/channel-message',route:MessageRoutes},
    {path:"/activity",route:ActivityRoutes},
    {path:"/notification",route:NotificationRoutes},
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;