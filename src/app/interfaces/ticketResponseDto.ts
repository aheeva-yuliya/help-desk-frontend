export interface TicketResponseDto {
    id: number;
    name: string;
    desiredResolutionDate: Date;
    urgency: string;
    state:string;
    action: Array<string>;
}