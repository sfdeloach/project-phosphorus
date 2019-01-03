// HELPER FUNCTION: determines if a UTT is criminal
import { CriminalUttsList } from '../lists/criminal.utts.list';
import { Statute } from '../models/statute.model';

export function isCriminalUtt(statute: Statute): boolean {
  const crimUtts: Statute[] = new CriminalUttsList().criminalUtts;

  const match: Statute[] = crimUtts.filter(
    s => s.statute === statute.statute && s.section === statute.section
  );

  return match.length > 0;
}
