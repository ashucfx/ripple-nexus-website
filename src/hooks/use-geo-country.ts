import { useState, useEffect } from 'react';
import type { CountryInfo } from '../lib/scheduler-types';
import { buildCountryInfo } from '../lib/rns-country';

const SESSION_KEY = 'rns_geo';

export function useGeoCountry(): { countryInfo: CountryInfo | null; loading: boolean } {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw) as CountryInfo;
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState(countryInfo === null);

  useEffect(() => {
    if (countryInfo !== null) return;

    fetch('/api/scheduler/detect-country')
      .then(r => r.json())
      .then(data => {
        const info = buildCountryInfo(
          data.countryCode ?? 'US',
          data.country ?? 'United States',
          data.fees,
        );
        try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(info)); } catch {}
        setCountryInfo(info);
      })
      .catch(() => {
        setCountryInfo(buildCountryInfo('US', 'United States'));
      })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { countryInfo, loading };
}
