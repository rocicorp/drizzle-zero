import {defineRelations, defineRelationsPart} from 'drizzle-orm/relations';
import * as schema from './tables';

export const coreRelations = defineRelations(schema, r => ({
  user: {
    messages: r.many.message(),
    mediums: r.many.medium({
      from: r.user.id.through(r.message.senderId),
      to: r.medium.id.through(r.message.mediumId),
      alias: 'user-mediums',
    }),
    friends: r.many.user({
      from: r.user.id.through(r.friendship.requestingId),
      to: r.user.id.through(r.friendship.acceptingId),
    }),
  },
  medium: {
    messages: r.many.message(),
    users: r.many.user({alias: 'user-mediums'}),
  },
  message: {
    medium: r.one.medium({
      from: r.message.mediumId,
      to: r.medium.id,
      optional: true,
    }),
    sender: r.one.user({
      from: r.message.senderId,
      to: r.user.id,
      optional: true,
    }),
  },
  filters: {
    parent: r.one.filters({
      from: r.filters.parentId,
      to: r.filters.id,
      optional: true,
    }),
    children: r.many.filters(),
  },
}));

export const projectRelations = defineRelationsPart(schema, r => ({
  projectTag: {
    taskLinks: r.many.projectTaskTag(),
  },
  project: {
    owner: r.one.user({
      from: r.project.ownerId,
      to: r.user.id,
      optional: true,
    }),
    phases: r.many.projectPhase(),
    tasks: r.many.projectTask(),
    notes: r.many.projectNote(),
    audits: r.many.projectAudit(),
  },
  projectPhase: {
    project: r.one.project({
      from: r.projectPhase.projectId,
      to: r.project.id,
      optional: false,
    }),
    tasks: r.many.projectTask(),
  },
  projectTask: {
    project: r.one.project({
      from: r.projectTask.projectId,
      to: r.project.id,
      optional: false,
    }),
    phase: r.one.projectPhase({
      from: r.projectTask.phaseId,
      to: r.projectPhase.id,
      optional: false,
    }),
    assignments: r.many.projectAssignment(),
    comments: r.many.projectComment(),
    attachments: r.many.projectAttachment(),
    tags: r.many.projectTaskTag(),
  },
  projectAssignment: {
    task: r.one.projectTask({
      from: r.projectAssignment.taskId,
      to: r.projectTask.id,
      optional: false,
    }),
    user: r.one.user({
      from: r.projectAssignment.userId,
      to: r.user.id,
      optional: false,
    }),
  },
  projectComment: {
    task: r.one.projectTask({
      from: r.projectComment.taskId,
      to: r.projectTask.id,
      optional: false,
    }),
    author: r.one.user({
      from: r.projectComment.authorId,
      to: r.user.id,
      optional: false,
    }),
  },
  projectAttachment: {
    task: r.one.projectTask({
      from: r.projectAttachment.taskId,
      to: r.projectTask.id,
      optional: false,
    }),
  },
  projectTaskTag: {
    task: r.one.projectTask({
      from: r.projectTaskTag.taskId,
      to: r.projectTask.id,
      optional: false,
    }),
    tag: r.one.projectTag({
      from: r.projectTaskTag.tagId,
      to: r.projectTag.id,
      optional: false,
    }),
  },
  projectNote: {
    project: r.one.project({
      from: r.projectNote.projectId,
      to: r.project.id,
      optional: false,
    }),
    author: r.one.user({
      from: r.projectNote.authorId,
      to: r.user.id,
      optional: true,
    }),
  },
  projectAudit: {
    project: r.one.project({
      from: r.projectAudit.projectId,
      to: r.project.id,
      optional: false,
    }),
    actor: r.one.user({
      from: r.projectAudit.actorId,
      to: r.user.id,
      optional: true,
    }),
  },
  featureFlag: {
    owner: r.one.user({
      from: r.featureFlag.ownerId,
      to: r.user.id,
      optional: true,
    }),
  },
  telemetryRollup: {
    project: r.one.project({
      from: r.telemetryRollup.projectId,
      to: r.project.id,
      optional: true,
    }),
  },
  webhookSubscription: {
    project: r.one.project({
      from: r.webhookSubscription.projectId,
      to: r.project.id,
      optional: true,
    }),
  },
}));

export const crmRelations = defineRelationsPart(schema, r => ({
  crmAccount: {
    owner: r.one.user({
      from: r.crmAccount.ownerId,
      to: r.user.id,
      optional: true,
    }),
    contacts: r.many.crmContact(),
    opportunities: r.many.crmOpportunity(),
    activities: r.many.crmActivity(),
    notes: r.many.crmNote(),
  },
  crmContact: {
    account: r.one.crmAccount({
      from: r.crmContact.accountId,
      to: r.crmAccount.id,
      optional: false,
    }),
    activities: r.many.crmActivity(),
    notes: r.many.crmNote(),
  },
  crmPipelineStage: {
    opportunities: r.many.crmOpportunity(),
    historyEntries: r.many.crmOpportunityStageHistory(),
  },
  crmOpportunity: {
    account: r.one.crmAccount({
      from: r.crmOpportunity.accountId,
      to: r.crmAccount.id,
      optional: false,
    }),
    stage: r.one.crmPipelineStage({
      from: r.crmOpportunity.stageId,
      to: r.crmPipelineStage.id,
      optional: false,
    }),
    activities: r.many.crmActivity(),
    historyEntries: r.many.crmOpportunityStageHistory(),
  },
  crmOpportunityStageHistory: {
    opportunity: r.one.crmOpportunity({
      from: r.crmOpportunityStageHistory.opportunityId,
      to: r.crmOpportunity.id,
      optional: false,
    }),
    stage: r.one.crmPipelineStage({
      from: r.crmOpportunityStageHistory.stageId,
      to: r.crmPipelineStage.id,
      optional: false,
    }),
    changedBy: r.one.user({
      from: r.crmOpportunityStageHistory.changedById,
      to: r.user.id,
      optional: true,
    }),
  },
  crmActivityType: {
    activities: r.many.crmActivity(),
  },
  crmActivity: {
    account: r.one.crmAccount({
      from: r.crmActivity.accountId,
      to: r.crmAccount.id,
      optional: false,
    }),
    contact: r.one.crmContact({
      from: r.crmActivity.contactId,
      to: r.crmContact.id,
      optional: true,
    }),
    opportunity: r.one.crmOpportunity({
      from: r.crmActivity.opportunityId,
      to: r.crmOpportunity.id,
      optional: true,
    }),
    type: r.one.crmActivityType({
      from: r.crmActivity.typeId,
      to: r.crmActivityType.id,
      optional: false,
    }),
    performer: r.one.user({
      from: r.crmActivity.performedById,
      to: r.user.id,
      optional: true,
    }),
  },
  crmNote: {
    account: r.one.crmAccount({
      from: r.crmNote.accountId,
      to: r.crmAccount.id,
      optional: false,
    }),
    contact: r.one.crmContact({
      from: r.crmNote.contactId,
      to: r.crmContact.id,
      optional: true,
    }),
    author: r.one.user({
      from: r.crmNote.authorId,
      to: r.user.id,
      optional: true,
    }),
  },
}));

export const commerceRelations = defineRelationsPart(schema, r => ({
  productCategory: {
    parent: r.one.productCategory({
      from: r.productCategory.parentId,
      to: r.productCategory.id,
      optional: true,
    }),
    children: r.many.productCategory(),
    products: r.many.product(),
  },
  product: {
    category: r.one.productCategory({
      from: r.product.categoryId,
      to: r.productCategory.id,
      optional: false,
    }),
    variants: r.many.productVariant(),
    media: r.many.productMedia(),
  },
  productVariant: {
    product: r.one.product({
      from: r.productVariant.productId,
      to: r.product.id,
      optional: false,
    }),
    inventoryItems: r.many.inventoryItem(),
    inventoryLevels: r.many.inventoryLevel(),
    orderItems: r.many.orderItem(),
  },
  productMedia: {
    product: r.one.product({
      from: r.productMedia.productId,
      to: r.product.id,
      optional: false,
    }),
  },
  inventoryLocation: {
    levels: r.many.inventoryLevel(),
  },
  inventoryItem: {
    variant: r.one.productVariant({
      from: r.inventoryItem.variantId,
      to: r.productVariant.id,
      optional: false,
    }),
  },
  inventoryLevel: {
    location: r.one.inventoryLocation({
      from: r.inventoryLevel.locationId,
      to: r.inventoryLocation.id,
      optional: false,
    }),
    variant: r.one.productVariant({
      from: r.inventoryLevel.variantId,
      to: r.productVariant.id,
      optional: false,
    }),
  },
  orderTable: {
    customer: r.one.user({
      from: r.orderTable.customerId,
      to: r.user.id,
      optional: true,
    }),
    opportunity: r.one.crmOpportunity({
      from: r.orderTable.opportunityId,
      to: r.crmOpportunity.id,
      optional: true,
    }),
    items: r.many.orderItem(),
    payments: r.many.orderPayment(),
    shipments: r.many.shipment(),
  },
  orderItem: {
    order: r.one.orderTable({
      from: r.orderItem.orderId,
      to: r.orderTable.id,
      optional: false,
    }),
    variant: r.one.productVariant({
      from: r.orderItem.variantId,
      to: r.productVariant.id,
      optional: false,
    }),
  },
  orderPayment: {
    order: r.one.orderTable({
      from: r.orderPayment.orderId,
      to: r.orderTable.id,
      optional: false,
    }),
    payment: r.one.payment({
      from: r.orderPayment.paymentId,
      to: r.payment.id,
      optional: true,
    }),
  },
  shipment: {
    order: r.one.orderTable({
      from: r.shipment.orderId,
      to: r.orderTable.id,
      optional: false,
    }),
    items: r.many.shipmentItem(),
  },
  shipmentItem: {
    shipment: r.one.shipment({
      from: r.shipmentItem.shipmentId,
      to: r.shipment.id,
      optional: false,
    }),
    orderItem: r.one.orderItem({
      from: r.shipmentItem.orderItemId,
      to: r.orderItem.id,
      optional: false,
    }),
  },
}));

export const peopleRelations = defineRelationsPart(schema, r => ({
  department: {
    manager: r.one.user({
      from: r.department.managerId,
      to: r.user.id,
      optional: true,
    }),
    teams: r.many.team(),
    employees: r.many.employeeProfile(),
  },
  employeeProfile: {
    user: r.one.user({
      from: r.employeeProfile.userId,
      to: r.user.id,
      optional: false,
    }),
    department: r.one.department({
      from: r.employeeProfile.departmentId,
      to: r.department.id,
      optional: true,
    }),
    team: r.one.team({
      from: r.employeeProfile.teamId,
      to: r.team.id,
      optional: true,
    }),
    employmentHistory: r.many.employmentHistory(),
    documents: r.many.employeeDocument(),
    timesheets: r.many.timesheet(),
    benefitEnrollments: r.many.benefitEnrollment(),
  },
  team: {
    department: r.one.department({
      from: r.team.departmentId,
      to: r.department.id,
      optional: false,
    }),
    lead: r.one.user({
      from: r.team.leadId,
      to: r.user.id,
      optional: true,
    }),
    employees: r.many.employeeProfile(),
  },
  employmentHistory: {
    employee: r.one.employeeProfile({
      from: r.employmentHistory.employeeId,
      to: r.employeeProfile.id,
      optional: false,
    }),
  },
  employeeDocument: {
    employee: r.one.employeeProfile({
      from: r.employeeDocument.employeeId,
      to: r.employeeProfile.id,
      optional: false,
    }),
    uploader: r.one.user({
      from: r.employeeDocument.uploadedById,
      to: r.user.id,
      optional: true,
    }),
  },
  timesheet: {
    employee: r.one.employeeProfile({
      from: r.timesheet.employeeId,
      to: r.employeeProfile.id,
      optional: false,
    }),
    submittedBy: r.one.user({
      from: r.timesheet.submittedById,
      to: r.user.id,
      optional: true,
    }),
    entries: r.many.timeEntry(),
  },
  timeEntry: {
    timesheet: r.one.timesheet({
      from: r.timeEntry.timesheetId,
      to: r.timesheet.id,
      optional: false,
    }),
    task: r.one.projectTask({
      from: r.timeEntry.taskId,
      to: r.projectTask.id,
      optional: true,
    }),
  },
  benefitPlan: {
    administrator: r.one.user({
      from: r.benefitPlan.administratorId,
      to: r.user.id,
      optional: true,
    }),
    enrollments: r.many.benefitEnrollment(),
  },
  benefitEnrollment: {
    benefitPlan: r.one.benefitPlan({
      from: r.benefitEnrollment.benefitPlanId,
      to: r.benefitPlan.id,
      optional: false,
    }),
    employee: r.one.employeeProfile({
      from: r.benefitEnrollment.employeeId,
      to: r.employeeProfile.id,
      optional: false,
    }),
  },
}));

export const supportRelations = defineRelationsPart(schema, r => ({
  supportTicket: {
    customer: r.one.user({
      from: r.supportTicket.customerId,
      to: r.user.id,
      optional: true,
    }),
    assignedTeam: r.one.team({
      from: r.supportTicket.assignedTeamId,
      to: r.team.id,
      optional: true,
    }),
    messages: r.many.supportTicketMessage(),
    tags: r.many.supportTicketTagLink(),
    assignments: r.many.supportTicketAssignment(),
    audits: r.many.supportTicketAudit(),
  },
  supportTicketMessage: {
    ticket: r.one.supportTicket({
      from: r.supportTicketMessage.ticketId,
      to: r.supportTicket.id,
      optional: false,
    }),
    author: r.one.user({
      from: r.supportTicketMessage.authorId,
      to: r.user.id,
      optional: true,
    }),
  },
  supportTicketTag: {
    ticketLinks: r.many.supportTicketTagLink(),
  },
  supportTicketTagLink: {
    ticket: r.one.supportTicket({
      from: r.supportTicketTagLink.ticketId,
      to: r.supportTicket.id,
      optional: false,
    }),
    tag: r.one.supportTicketTag({
      from: r.supportTicketTagLink.tagId,
      to: r.supportTicketTag.id,
      optional: false,
    }),
  },
  supportTicketAssignment: {
    ticket: r.one.supportTicket({
      from: r.supportTicketAssignment.ticketId,
      to: r.supportTicket.id,
      optional: false,
    }),
    assignee: r.one.user({
      from: r.supportTicketAssignment.assigneeId,
      to: r.user.id,
      optional: true,
    }),
  },
  supportTicketAudit: {
    ticket: r.one.supportTicket({
      from: r.supportTicketAudit.ticketId,
      to: r.supportTicket.id,
      optional: false,
    }),
    actor: r.one.user({
      from: r.supportTicketAudit.actorId,
      to: r.user.id,
      optional: true,
    }),
  },
}));

export const financeRelations = defineRelationsPart(schema, r => ({
  billingInvoice: {
    account: r.one.crmAccount({
      from: r.billingInvoice.accountId,
      to: r.crmAccount.id,
      optional: false,
    }),
    contact: r.one.crmContact({
      from: r.billingInvoice.contactId,
      to: r.crmContact.id,
      optional: true,
    }),
    issuer: r.one.user({
      from: r.billingInvoice.issuedById,
      to: r.user.id,
      optional: true,
    }),
    lines: r.many.billingInvoiceLine(),
  },
  billingInvoiceLine: {
    invoice: r.one.billingInvoice({
      from: r.billingInvoiceLine.invoiceId,
      to: r.billingInvoice.id,
      optional: false,
    }),
    orderItem: r.one.orderItem({
      from: r.billingInvoiceLine.orderItemId,
      to: r.orderItem.id,
      optional: true,
    }),
  },
  expenseReport: {
    owner: r.one.user({
      from: r.expenseReport.ownerId,
      to: r.user.id,
      optional: false,
    }),
    department: r.one.department({
      from: r.expenseReport.departmentId,
      to: r.department.id,
      optional: true,
    }),
    items: r.many.expenseItem(),
  },
  expenseItem: {
    report: r.one.expenseReport({
      from: r.expenseItem.reportId,
      to: r.expenseReport.id,
      optional: false,
    }),
  },
  ledgerAccount: {
    parent: r.one.ledgerAccount({
      from: r.ledgerAccount.parentAccountId,
      to: r.ledgerAccount.id,
      optional: true,
    }),
    children: r.many.ledgerAccount(),
    entries: r.many.ledgerEntry(),
    budgetLines: r.many.budgetLine(),
  },
  ledgerTransaction: {
    creator: r.one.user({
      from: r.ledgerTransaction.createdById,
      to: r.user.id,
      optional: true,
    }),
    entries: r.many.ledgerEntry(),
  },
  ledgerEntry: {
    transaction: r.one.ledgerTransaction({
      from: r.ledgerEntry.transactionId,
      to: r.ledgerTransaction.id,
      optional: false,
    }),
    account: r.one.ledgerAccount({
      from: r.ledgerEntry.accountId,
      to: r.ledgerAccount.id,
      optional: false,
    }),
  },
  budget: {
    department: r.one.department({
      from: r.budget.departmentId,
      to: r.department.id,
      optional: true,
    }),
    lines: r.many.budgetLine(),
  },
  budgetLine: {
    budget: r.one.budget({
      from: r.budgetLine.budgetId,
      to: r.budget.id,
      optional: false,
    }),
    account: r.one.ledgerAccount({
      from: r.budgetLine.accountId,
      to: r.ledgerAccount.id,
      optional: false,
    }),
  },
}));

export const marketingRelations = defineRelationsPart(schema, r => ({
  marketingCampaign: {
    owner: r.one.user({
      from: r.marketingCampaign.ownerId,
      to: r.user.id,
      optional: true,
    }),
    channels: r.many.marketingCampaignChannel(),
    audiences: r.many.marketingCampaignAudience(),
  },
  marketingChannel: {
    campaignChannels: r.many.marketingCampaignChannel(),
  },
  marketingCampaignChannel: {
    campaign: r.one.marketingCampaign({
      from: r.marketingCampaignChannel.campaignId,
      to: r.marketingCampaign.id,
      optional: false,
    }),
    channel: r.one.marketingChannel({
      from: r.marketingCampaignChannel.channelId,
      to: r.marketingChannel.id,
      optional: false,
    }),
  },
  marketingAudience: {
    campaignAudiences: r.many.marketingCampaignAudience(),
  },
  marketingCampaignAudience: {
    campaign: r.one.marketingCampaign({
      from: r.marketingCampaignAudience.campaignId,
      to: r.marketingCampaign.id,
      optional: false,
    }),
    audience: r.one.marketingAudience({
      from: r.marketingCampaignAudience.audienceId,
      to: r.marketingAudience.id,
      optional: false,
    }),
  },
}));

export const analyticsRelations = defineRelationsPart(schema, r => ({
  analyticsDashboard: {
    owner: r.one.user({
      from: r.analyticsDashboard.ownerId,
      to: r.user.id,
      optional: true,
    }),
    widgets: r.many.analyticsWidget(),
  },
  analyticsWidget: {
    dashboard: r.one.analyticsDashboard({
      from: r.analyticsWidget.dashboardId,
      to: r.analyticsDashboard.id,
      optional: false,
    }),
    queries: r.many.analyticsWidgetQuery(),
  },
  analyticsWidgetQuery: {
    widget: r.one.analyticsWidget({
      from: r.analyticsWidgetQuery.widgetId,
      to: r.analyticsWidget.id,
      optional: false,
    }),
  },
}));

export const integrationRelations = defineRelationsPart(schema, r => ({
  integrationWebhook: {
    project: r.one.project({
      from: r.integrationWebhook.projectId,
      to: r.project.id,
      optional: true,
    }),
    account: r.one.crmAccount({
      from: r.integrationWebhook.accountId,
      to: r.crmAccount.id,
      optional: true,
    }),
    events: r.many.integrationEvent(),
  },
  integrationEvent: {
    webhook: r.one.integrationWebhook({
      from: r.integrationEvent.webhookId,
      to: r.integrationWebhook.id,
      optional: false,
    }),
  },
  integrationCredential: {
    webhook: r.one.integrationWebhook({
      from: r.integrationCredential.webhookId,
      to: r.integrationWebhook.id,
      optional: true,
    }),
  },
}));

export const documentRelations = defineRelationsPart(schema, r => ({
  documentLibrary: {
    project: r.one.project({
      from: r.documentLibrary.projectId,
      to: r.project.id,
      optional: true,
    }),
    folders: r.many.documentFolder(),
  },
  documentFolder: {
    library: r.one.documentLibrary({
      from: r.documentFolder.libraryId,
      to: r.documentLibrary.id,
      optional: false,
    }),
    parent: r.one.documentFolder({
      from: r.documentFolder.parentId,
      to: r.documentFolder.id,
      optional: true,
    }),
    children: r.many.documentFolder(),
    files: r.many.documentFile(),
  },
  documentFile: {
    folder: r.one.documentFolder({
      from: r.documentFile.folderId,
      to: r.documentFolder.id,
      optional: false,
    }),
    uploader: r.one.user({
      from: r.documentFile.uploadedById,
      to: r.user.id,
      optional: true,
    }),
    versions: r.many.documentFileVersion(),
    sharings: r.many.documentSharing(),
  },
  documentFileVersion: {
    file: r.one.documentFile({
      from: r.documentFileVersion.fileId,
      to: r.documentFile.id,
      optional: false,
    }),
    uploader: r.one.user({
      from: r.documentFileVersion.uploadedById,
      to: r.user.id,
      optional: true,
    }),
  },
  documentSharing: {
    file: r.one.documentFile({
      from: r.documentSharing.fileId,
      to: r.documentFile.id,
      optional: false,
    }),
    user: r.one.user({
      from: r.documentSharing.sharedWithUserId,
      to: r.user.id,
      optional: true,
    }),
    team: r.one.team({
      from: r.documentSharing.sharedWithTeamId,
      to: r.team.id,
      optional: true,
    }),
  },
}));
