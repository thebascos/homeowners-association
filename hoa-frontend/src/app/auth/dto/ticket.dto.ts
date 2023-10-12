export interface TicketDTO {
  createdAt: Date;
  id: string;
  description: string;
  category: TicketCategory;
  status?: TicketStatus;
  editing?: boolean;
  formattedCreatedAt?: Date;
  resolution?: string;
  ho: {
    name: string;
    houseCode: string;
    admin: boolean;
  };
}

export interface EditTicketDTO {
  id: string;
  description: string;
  category: TicketCategory;
  status?: TicketStatus;
  editing?: boolean;
  resolution?: string;
  ho: {
    name: string;
    houseCode: string;
    admin: boolean;
  };
}
export enum TicketCategory {
  MAINTENANCE = 'MAINTENANCE',
  COMPPLAINT = 'COMPLAINT',
}
export enum TicketStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}
