export interface OverviewResponse {
    id: number;
    name: string;
    description: string;
    createdOn: Date;
    desiredResolutionDate: Date;
    category: string;
    status: string;
    urgency: string;

    owner: string;
    approver: string;
    assignee: string;

    attachments: any;
    history: any;
    comments: any;
}