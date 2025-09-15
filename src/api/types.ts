export type Cat = {
    id: string;
    name: string;
    description?: string;
    temperament?: string;
    origin?: string;
    country_code?: string;
    country_codes?: string;
    life_span?: string;
    wikipedia_url?: string;
    cfa_url?: string;
    vcahospitals_url?: string;
    vetstreet_url?: string;
    reference_image_id?: string;
    alt_names?: string;
    adaptability?: number;
    affection_level?: number;
    child_friendly?: number;
    dog_friendly?: number;
    energy_level?: number;
    grooming?: number;
    health_issues?: number;
    intelligence?: number;
    shedding_level?: number;
    social_needs?: number;
    stranger_friendly?: number;
    vocalisation?: number;
    experimental?: number;
    hairless?: number;
    hypoallergenic?: number;
    indoor?: number;
    lap?: number;
    natural?: number;
    rare?: number;
    rex?: number;
    short_legs?: number;
    suppressed_tail?: number;
    weight?: {
      imperial: string;
      metric: string;
    };
    image?: {
      id?: string;
      url?: string;
      width?: number;
      height?: number;
    };

    url?: string;
  };
 