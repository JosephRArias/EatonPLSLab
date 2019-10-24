export class BatchModel {
    id: string; 
    user: string;
    dueDate: Date;
    priority: number;
    purpose: string;
    disp: string;
    
    status: number = 0;
    initDate: Date = new Date();
    techId?: string;
    comment?: string;
}