/** Studio-level facts. Kept apart from the project list so the list can stay a
 *  lazily-loaded chunk instead of riding along in the shared bundle. */

export const ORIGIN = 'https://temidayoxyz.github.io'

/** This index's own repository — what every "Source" link points at. */
export const SOURCE = 'https://github.com/temidayoxyz/studio'

/** The last date every deployment in the index was re-fetched and answered 200. */
export const VERIFIED_ON = '2026-09-25'

export const siteUrl = (slug) => `${ORIGIN}/${slug}/`

const LONG = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const verifiedLong = () => LONG.format(new Date(VERIFIED_ON))
