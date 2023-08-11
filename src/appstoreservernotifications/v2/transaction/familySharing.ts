/**
 * A string that describes whether the transaction was purchased by the user, or is available to them through Family Sharing.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/inappownershiptype
 * @version 2.0+
 */
export enum inAppOwnershipType {
  /**
   * The transaction belongs to a family member who benefits from the service.
   */
  FAMILY_SHARED = 'FAMILY_SHARED',

  /**
   * The transaction belongs to the purchaser.
   */
  PURCHASED = 'PURCHASED',
}

