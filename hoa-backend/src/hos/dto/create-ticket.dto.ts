export interface CreateTicketDTO {
  description: string;
  category: TicketCategory;
  status?: TicketStatus;
  id: string;
  createdAt: Date;
  resolution?: string;
}

enum TicketCategory {
  MAINTENANCE = 'MAINTENANCE',
  COMPPLAINT = 'COMPLAINT',
}
enum TicketStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}
