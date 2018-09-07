export class EpisodeStatistics {
  constructor(
    public episodes: {
      total: number;
      callOnly: number;
      reportOnly: number;
      callAndReport: number;
      empty: number;
    },
    public calls: {
      total: number;
      earliest: Date;
      latest: Date;
      first: number;
      last: number;
    },
    public reports: {
      total: number;
      offense: number;
      uttAndWarnings: number;
      cjis: number;
      fcc: number;
      trespass: number;
      crash: number;
      ap: number;
    }
  ) {}
}
