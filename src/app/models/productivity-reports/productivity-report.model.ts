import { ReportMetaData } from './report.metadata.model';
import { InitiatedDispo } from './initiated-dispo.model';
import { NonInitiated } from './non-initiated.model';
import { OverallInitiated } from './overall-initiated.model';

export class ProductivityReport {
    constructor(
        public meta: ReportMetaData,
        public report: InitiatedDispo[] | NonInitiated[] | OverallInitiated[],
        public _id?
    ) { }
}
