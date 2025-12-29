/**
 * Afstandsberegning mellem to koordinater
 * Bruges til at tjekke om kunden er inden for gratis levering/afhentning
 */

// Sundby Sliberi's adresse: Hamborgskovvej 11, 4800 Nykøbing Falster
// Koordinater hentet fra DAWA
export const SUNDBY_SLIBERI_COORDS = {
  lat: 54.7652,
  lng: 11.8758,
};

// Gratis levering/afhentning inden for denne radius (i km)
export const FREE_DELIVERY_RADIUS_KM = 30;

/**
 * Beregner afstanden mellem to punkter på jorden (i km)
 * Bruger Haversine-formlen
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Jordens radius i km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Tjekker om en kunde er inden for gratis leveringszone
 */
export function isWithinFreeDeliveryZone(
  customerLat: number,
  customerLng: number
): boolean {
  const distance = haversineDistance(
    SUNDBY_SLIBERI_COORDS.lat,
    SUNDBY_SLIBERI_COORDS.lng,
    customerLat,
    customerLng
  );
  return distance <= FREE_DELIVERY_RADIUS_KM;
}

/**
 * Returnerer afstanden til Sundby Sliberi i km
 */
export function distanceToSundbySliberi(
  customerLat: number,
  customerLng: number
): number {
  return haversineDistance(
    SUNDBY_SLIBERI_COORDS.lat,
    SUNDBY_SLIBERI_COORDS.lng,
    customerLat,
    customerLng
  );
}

