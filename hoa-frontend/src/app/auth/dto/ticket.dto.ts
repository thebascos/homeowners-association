export interface TicketDTO {
  description: string;
  category: TicketCategory;
  status?: TicketStatus;
}
export enum TicketCategory {
  MAINTENANCE = 'MAINTENANCE',
  COMPPLAINT = 'COMPLAINT',
}
enum TicketStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}
