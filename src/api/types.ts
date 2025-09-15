export type Cat = {
    id: string;
    name: string;
    width: number;
    height: number;
    url: string;
    breeds: Breed[];
  };

  type Breed = {
    weight: {
      imperial: string;
      metric: string;
    };
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    life_span: string;
    wikipedia_url: string;
  };
 