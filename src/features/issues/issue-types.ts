export type IssueStatus = 'REPORTED' | 'UNDER_REVIEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_CONFIRMATION' | 'CLOSED' | 'REJECTED' | 'DISPUTED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type Issue = { id: string; title: string; description: string; location?: string; images: string[]; status: IssueStatus; priority?: Priority; categoryId: string; categoryName: string; createdAt: string; updatedAt: string; assignedWorker?: { name: string; specialization?: string }; feedback?: { rating: number; comment?: string } }
export type WorkerUpdate = { id: string; note?: string; materials?: string; images: string[]; createdAt: string; workerName: string }
export type Category = { id: string; name: string }
