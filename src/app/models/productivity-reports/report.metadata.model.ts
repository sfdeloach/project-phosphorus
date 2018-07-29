export class ReportMetaData {
  constructor(
    public title: string,
    public reportType: string,
    public created: Date,
    public startDate?: Date,
    public endDate?: Date
  ) {}
}
