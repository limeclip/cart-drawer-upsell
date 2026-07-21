
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model ShopSubscription
 * 
 */
export type ShopSubscription = $Result.DefaultSelection<Prisma.$ShopSubscriptionPayload>
/**
 * Model CartSettings
 * 
 */
export type CartSettings = $Result.DefaultSelection<Prisma.$CartSettingsPayload>
/**
 * Model CartEvent
 * 
 */
export type CartEvent = $Result.DefaultSelection<Prisma.$CartEventPayload>
/**
 * Model UpsellEvent
 * 
 */
export type UpsellEvent = $Result.DefaultSelection<Prisma.$UpsellEventPayload>
/**
 * Model OrderEvent
 * 
 */
export type OrderEvent = $Result.DefaultSelection<Prisma.$OrderEventPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopSubscription`: Exposes CRUD operations for the **ShopSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopSubscriptions
    * const shopSubscriptions = await prisma.shopSubscription.findMany()
    * ```
    */
  get shopSubscription(): Prisma.ShopSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cartSettings`: Exposes CRUD operations for the **CartSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartSettings
    * const cartSettings = await prisma.cartSettings.findMany()
    * ```
    */
  get cartSettings(): Prisma.CartSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cartEvent`: Exposes CRUD operations for the **CartEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartEvents
    * const cartEvents = await prisma.cartEvent.findMany()
    * ```
    */
  get cartEvent(): Prisma.CartEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.upsellEvent`: Exposes CRUD operations for the **UpsellEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UpsellEvents
    * const upsellEvents = await prisma.upsellEvent.findMany()
    * ```
    */
  get upsellEvent(): Prisma.UpsellEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderEvent`: Exposes CRUD operations for the **OrderEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderEvents
    * const orderEvents = await prisma.orderEvent.findMany()
    * ```
    */
  get orderEvent(): Prisma.OrderEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    ShopSubscription: 'ShopSubscription',
    CartSettings: 'CartSettings',
    CartEvent: 'CartEvent',
    UpsellEvent: 'UpsellEvent',
    OrderEvent: 'OrderEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "shopSubscription" | "cartSettings" | "cartEvent" | "upsellEvent" | "orderEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      ShopSubscription: {
        payload: Prisma.$ShopSubscriptionPayload<ExtArgs>
        fields: Prisma.ShopSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.ShopSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          findMany: {
            args: Prisma.ShopSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>[]
          }
          create: {
            args: Prisma.ShopSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          createMany: {
            args: Prisma.ShopSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.ShopSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          update: {
            args: Prisma.ShopSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.ShopSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.ShopSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.ShopSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopSubscription>
          }
          groupBy: {
            args: Prisma.ShopSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<ShopSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      CartSettings: {
        payload: Prisma.$CartSettingsPayload<ExtArgs>
        fields: Prisma.CartSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          findFirst: {
            args: Prisma.CartSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          findMany: {
            args: Prisma.CartSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>[]
          }
          create: {
            args: Prisma.CartSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          createMany: {
            args: Prisma.CartSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>[]
          }
          delete: {
            args: Prisma.CartSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          update: {
            args: Prisma.CartSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          deleteMany: {
            args: Prisma.CartSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CartSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>[]
          }
          upsert: {
            args: Prisma.CartSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartSettingsPayload>
          }
          aggregate: {
            args: Prisma.CartSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartSettings>
          }
          groupBy: {
            args: Prisma.CartSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<CartSettingsCountAggregateOutputType> | number
          }
        }
      }
      CartEvent: {
        payload: Prisma.$CartEventPayload<ExtArgs>
        fields: Prisma.CartEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          findFirst: {
            args: Prisma.CartEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          findMany: {
            args: Prisma.CartEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>[]
          }
          create: {
            args: Prisma.CartEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          createMany: {
            args: Prisma.CartEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>[]
          }
          delete: {
            args: Prisma.CartEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          update: {
            args: Prisma.CartEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          deleteMany: {
            args: Prisma.CartEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CartEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>[]
          }
          upsert: {
            args: Prisma.CartEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartEventPayload>
          }
          aggregate: {
            args: Prisma.CartEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartEvent>
          }
          groupBy: {
            args: Prisma.CartEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartEventCountArgs<ExtArgs>
            result: $Utils.Optional<CartEventCountAggregateOutputType> | number
          }
        }
      }
      UpsellEvent: {
        payload: Prisma.$UpsellEventPayload<ExtArgs>
        fields: Prisma.UpsellEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UpsellEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UpsellEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          findFirst: {
            args: Prisma.UpsellEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UpsellEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          findMany: {
            args: Prisma.UpsellEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>[]
          }
          create: {
            args: Prisma.UpsellEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          createMany: {
            args: Prisma.UpsellEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UpsellEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>[]
          }
          delete: {
            args: Prisma.UpsellEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          update: {
            args: Prisma.UpsellEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          deleteMany: {
            args: Prisma.UpsellEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UpsellEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UpsellEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>[]
          }
          upsert: {
            args: Prisma.UpsellEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpsellEventPayload>
          }
          aggregate: {
            args: Prisma.UpsellEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpsellEvent>
          }
          groupBy: {
            args: Prisma.UpsellEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<UpsellEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.UpsellEventCountArgs<ExtArgs>
            result: $Utils.Optional<UpsellEventCountAggregateOutputType> | number
          }
        }
      }
      OrderEvent: {
        payload: Prisma.$OrderEventPayload<ExtArgs>
        fields: Prisma.OrderEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          findFirst: {
            args: Prisma.OrderEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          findMany: {
            args: Prisma.OrderEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>[]
          }
          create: {
            args: Prisma.OrderEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          createMany: {
            args: Prisma.OrderEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>[]
          }
          delete: {
            args: Prisma.OrderEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          update: {
            args: Prisma.OrderEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          deleteMany: {
            args: Prisma.OrderEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>[]
          }
          upsert: {
            args: Prisma.OrderEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEventPayload>
          }
          aggregate: {
            args: Prisma.OrderEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderEvent>
          }
          groupBy: {
            args: Prisma.OrderEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderEventCountArgs<ExtArgs>
            result: $Utils.Optional<OrderEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    shopSubscription?: ShopSubscriptionOmit
    cartSettings?: CartSettingsOmit
    cartEvent?: CartEventOmit
    upsellEvent?: UpsellEventOmit
    orderEvent?: OrderEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: bigint | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    shop: number
    state: number
    isOnline: number
    scope: number
    expires: number
    accessToken: number
    userId: number
    firstName: number
    lastName: number
    email: number
    accountOwner: number
    locale: number
    collaborator: number
    emailVerified: number
    refreshToken: number
    refreshTokenExpires: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    shop: string
    state: string
    isOnline: boolean
    scope: string | null
    expires: Date | null
    accessToken: string
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "state" | "isOnline" | "scope" | "expires" | "accessToken" | "userId" | "firstName" | "lastName" | "email" | "accountOwner" | "locale" | "collaborator" | "emailVerified" | "refreshToken" | "refreshTokenExpires", ExtArgs["result"]["session"]>

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      state: string
      isOnline: boolean
      scope: string | null
      expires: Date | null
      accessToken: string
      userId: bigint | null
      firstName: string | null
      lastName: string | null
      email: string | null
      accountOwner: boolean
      locale: string | null
      collaborator: boolean | null
      emailVerified: boolean | null
      refreshToken: string | null
      refreshTokenExpires: Date | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly shop: FieldRef<"Session", 'String'>
    readonly state: FieldRef<"Session", 'String'>
    readonly isOnline: FieldRef<"Session", 'Boolean'>
    readonly scope: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly accessToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'BigInt'>
    readonly firstName: FieldRef<"Session", 'String'>
    readonly lastName: FieldRef<"Session", 'String'>
    readonly email: FieldRef<"Session", 'String'>
    readonly accountOwner: FieldRef<"Session", 'Boolean'>
    readonly locale: FieldRef<"Session", 'String'>
    readonly collaborator: FieldRef<"Session", 'Boolean'>
    readonly emailVerified: FieldRef<"Session", 'Boolean'>
    readonly refreshToken: FieldRef<"Session", 'String'>
    readonly refreshTokenExpires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
  }


  /**
   * Model ShopSubscription
   */

  export type AggregateShopSubscription = {
    _count: ShopSubscriptionCountAggregateOutputType | null
    _avg: ShopSubscriptionAvgAggregateOutputType | null
    _sum: ShopSubscriptionSumAggregateOutputType | null
    _min: ShopSubscriptionMinAggregateOutputType | null
    _max: ShopSubscriptionMaxAggregateOutputType | null
  }

  export type ShopSubscriptionAvgAggregateOutputType = {
    orderLimit: number | null
    orderCount: number | null
  }

  export type ShopSubscriptionSumAggregateOutputType = {
    orderLimit: number | null
    orderCount: number | null
  }

  export type ShopSubscriptionMinAggregateOutputType = {
    id: string | null
    shop: string | null
    planName: string | null
    orderLimit: number | null
    orderCount: number | null
    trialEndsAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopSubscriptionMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    planName: string | null
    orderLimit: number | null
    orderCount: number | null
    trialEndsAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopSubscriptionCountAggregateOutputType = {
    id: number
    shop: number
    planName: number
    orderLimit: number
    orderCount: number
    trialEndsAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopSubscriptionAvgAggregateInputType = {
    orderLimit?: true
    orderCount?: true
  }

  export type ShopSubscriptionSumAggregateInputType = {
    orderLimit?: true
    orderCount?: true
  }

  export type ShopSubscriptionMinAggregateInputType = {
    id?: true
    shop?: true
    planName?: true
    orderLimit?: true
    orderCount?: true
    trialEndsAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopSubscriptionMaxAggregateInputType = {
    id?: true
    shop?: true
    planName?: true
    orderLimit?: true
    orderCount?: true
    trialEndsAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopSubscriptionCountAggregateInputType = {
    id?: true
    shop?: true
    planName?: true
    orderLimit?: true
    orderCount?: true
    trialEndsAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopSubscription to aggregate.
     */
    where?: ShopSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopSubscriptions to fetch.
     */
    orderBy?: ShopSubscriptionOrderByWithRelationInput | ShopSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopSubscriptions
    **/
    _count?: true | ShopSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopSubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopSubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopSubscriptionMaxAggregateInputType
  }

  export type GetShopSubscriptionAggregateType<T extends ShopSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateShopSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopSubscription[P]>
      : GetScalarType<T[P], AggregateShopSubscription[P]>
  }




  export type ShopSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopSubscriptionWhereInput
    orderBy?: ShopSubscriptionOrderByWithAggregationInput | ShopSubscriptionOrderByWithAggregationInput[]
    by: ShopSubscriptionScalarFieldEnum[] | ShopSubscriptionScalarFieldEnum
    having?: ShopSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopSubscriptionCountAggregateInputType | true
    _avg?: ShopSubscriptionAvgAggregateInputType
    _sum?: ShopSubscriptionSumAggregateInputType
    _min?: ShopSubscriptionMinAggregateInputType
    _max?: ShopSubscriptionMaxAggregateInputType
  }

  export type ShopSubscriptionGroupByOutputType = {
    id: string
    shop: string
    planName: string
    orderLimit: number
    orderCount: number
    trialEndsAt: Date | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ShopSubscriptionCountAggregateOutputType | null
    _avg: ShopSubscriptionAvgAggregateOutputType | null
    _sum: ShopSubscriptionSumAggregateOutputType | null
    _min: ShopSubscriptionMinAggregateOutputType | null
    _max: ShopSubscriptionMaxAggregateOutputType | null
  }

  type GetShopSubscriptionGroupByPayload<T extends ShopSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], ShopSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type ShopSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    planName?: boolean
    orderLimit?: boolean
    orderCount?: boolean
    trialEndsAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settings?: boolean | ShopSubscription$settingsArgs<ExtArgs>
  }, ExtArgs["result"]["shopSubscription"]>

  export type ShopSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    planName?: boolean
    orderLimit?: boolean
    orderCount?: boolean
    trialEndsAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shopSubscription"]>

  export type ShopSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    planName?: boolean
    orderLimit?: boolean
    orderCount?: boolean
    trialEndsAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shopSubscription"]>

  export type ShopSubscriptionSelectScalar = {
    id?: boolean
    shop?: boolean
    planName?: boolean
    orderLimit?: boolean
    orderCount?: boolean
    trialEndsAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "planName" | "orderLimit" | "orderCount" | "trialEndsAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["shopSubscription"]>
  export type ShopSubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | ShopSubscription$settingsArgs<ExtArgs>
  }
  export type ShopSubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShopSubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShopSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopSubscription"
    objects: {
      settings: Prisma.$CartSettingsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      planName: string
      orderLimit: number
      orderCount: number
      trialEndsAt: Date | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopSubscription"]>
    composites: {}
  }

  type ShopSubscriptionGetPayload<S extends boolean | null | undefined | ShopSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$ShopSubscriptionPayload, S>

  type ShopSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopSubscriptionCountAggregateInputType | true
    }

  export interface ShopSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopSubscription'], meta: { name: 'ShopSubscription' } }
    /**
     * Find zero or one ShopSubscription that matches the filter.
     * @param {ShopSubscriptionFindUniqueArgs} args - Arguments to find a ShopSubscription
     * @example
     * // Get one ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopSubscriptionFindUniqueArgs>(args: SelectSubset<T, ShopSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShopSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a ShopSubscription
     * @example
     * // Get one ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionFindFirstArgs} args - Arguments to find a ShopSubscription
     * @example
     * // Get one ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopSubscriptionFindFirstArgs>(args?: SelectSubset<T, ShopSubscriptionFindFirstArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionFindFirstOrThrowArgs} args - Arguments to find a ShopSubscription
     * @example
     * // Get one ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShopSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopSubscriptions
     * const shopSubscriptions = await prisma.shopSubscription.findMany()
     * 
     * // Get first 10 ShopSubscriptions
     * const shopSubscriptions = await prisma.shopSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopSubscriptionWithIdOnly = await prisma.shopSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopSubscriptionFindManyArgs>(args?: SelectSubset<T, ShopSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShopSubscription.
     * @param {ShopSubscriptionCreateArgs} args - Arguments to create a ShopSubscription.
     * @example
     * // Create one ShopSubscription
     * const ShopSubscription = await prisma.shopSubscription.create({
     *   data: {
     *     // ... data to create a ShopSubscription
     *   }
     * })
     * 
     */
    create<T extends ShopSubscriptionCreateArgs>(args: SelectSubset<T, ShopSubscriptionCreateArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShopSubscriptions.
     * @param {ShopSubscriptionCreateManyArgs} args - Arguments to create many ShopSubscriptions.
     * @example
     * // Create many ShopSubscriptions
     * const shopSubscription = await prisma.shopSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopSubscriptionCreateManyArgs>(args?: SelectSubset<T, ShopSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopSubscriptions and returns the data saved in the database.
     * @param {ShopSubscriptionCreateManyAndReturnArgs} args - Arguments to create many ShopSubscriptions.
     * @example
     * // Create many ShopSubscriptions
     * const shopSubscription = await prisma.shopSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopSubscriptions and only return the `id`
     * const shopSubscriptionWithIdOnly = await prisma.shopSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShopSubscription.
     * @param {ShopSubscriptionDeleteArgs} args - Arguments to delete one ShopSubscription.
     * @example
     * // Delete one ShopSubscription
     * const ShopSubscription = await prisma.shopSubscription.delete({
     *   where: {
     *     // ... filter to delete one ShopSubscription
     *   }
     * })
     * 
     */
    delete<T extends ShopSubscriptionDeleteArgs>(args: SelectSubset<T, ShopSubscriptionDeleteArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShopSubscription.
     * @param {ShopSubscriptionUpdateArgs} args - Arguments to update one ShopSubscription.
     * @example
     * // Update one ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopSubscriptionUpdateArgs>(args: SelectSubset<T, ShopSubscriptionUpdateArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShopSubscriptions.
     * @param {ShopSubscriptionDeleteManyArgs} args - Arguments to filter ShopSubscriptions to delete.
     * @example
     * // Delete a few ShopSubscriptions
     * const { count } = await prisma.shopSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopSubscriptionDeleteManyArgs>(args?: SelectSubset<T, ShopSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopSubscriptions
     * const shopSubscription = await prisma.shopSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopSubscriptionUpdateManyArgs>(args: SelectSubset<T, ShopSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopSubscriptions and returns the data updated in the database.
     * @param {ShopSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many ShopSubscriptions.
     * @example
     * // Update many ShopSubscriptions
     * const shopSubscription = await prisma.shopSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShopSubscriptions and only return the `id`
     * const shopSubscriptionWithIdOnly = await prisma.shopSubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShopSubscription.
     * @param {ShopSubscriptionUpsertArgs} args - Arguments to update or create a ShopSubscription.
     * @example
     * // Update or create a ShopSubscription
     * const shopSubscription = await prisma.shopSubscription.upsert({
     *   create: {
     *     // ... data to create a ShopSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopSubscription we want to update
     *   }
     * })
     */
    upsert<T extends ShopSubscriptionUpsertArgs>(args: SelectSubset<T, ShopSubscriptionUpsertArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShopSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionCountArgs} args - Arguments to filter ShopSubscriptions to count.
     * @example
     * // Count the number of ShopSubscriptions
     * const count = await prisma.shopSubscription.count({
     *   where: {
     *     // ... the filter for the ShopSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends ShopSubscriptionCountArgs>(
      args?: Subset<T, ShopSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopSubscriptionAggregateArgs>(args: Subset<T, ShopSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetShopSubscriptionAggregateType<T>>

    /**
     * Group by ShopSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: ShopSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopSubscription model
   */
  readonly fields: ShopSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    settings<T extends ShopSubscription$settingsArgs<ExtArgs> = {}>(args?: Subset<T, ShopSubscription$settingsArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopSubscription model
   */
  interface ShopSubscriptionFieldRefs {
    readonly id: FieldRef<"ShopSubscription", 'String'>
    readonly shop: FieldRef<"ShopSubscription", 'String'>
    readonly planName: FieldRef<"ShopSubscription", 'String'>
    readonly orderLimit: FieldRef<"ShopSubscription", 'Int'>
    readonly orderCount: FieldRef<"ShopSubscription", 'Int'>
    readonly trialEndsAt: FieldRef<"ShopSubscription", 'DateTime'>
    readonly isActive: FieldRef<"ShopSubscription", 'Boolean'>
    readonly createdAt: FieldRef<"ShopSubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopSubscription findUnique
   */
  export type ShopSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ShopSubscription to fetch.
     */
    where: ShopSubscriptionWhereUniqueInput
  }

  /**
   * ShopSubscription findUniqueOrThrow
   */
  export type ShopSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ShopSubscription to fetch.
     */
    where: ShopSubscriptionWhereUniqueInput
  }

  /**
   * ShopSubscription findFirst
   */
  export type ShopSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ShopSubscription to fetch.
     */
    where?: ShopSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopSubscriptions to fetch.
     */
    orderBy?: ShopSubscriptionOrderByWithRelationInput | ShopSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopSubscriptions.
     */
    cursor?: ShopSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopSubscriptions.
     */
    distinct?: ShopSubscriptionScalarFieldEnum | ShopSubscriptionScalarFieldEnum[]
  }

  /**
   * ShopSubscription findFirstOrThrow
   */
  export type ShopSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ShopSubscription to fetch.
     */
    where?: ShopSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopSubscriptions to fetch.
     */
    orderBy?: ShopSubscriptionOrderByWithRelationInput | ShopSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopSubscriptions.
     */
    cursor?: ShopSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopSubscriptions.
     */
    distinct?: ShopSubscriptionScalarFieldEnum | ShopSubscriptionScalarFieldEnum[]
  }

  /**
   * ShopSubscription findMany
   */
  export type ShopSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which ShopSubscriptions to fetch.
     */
    where?: ShopSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopSubscriptions to fetch.
     */
    orderBy?: ShopSubscriptionOrderByWithRelationInput | ShopSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopSubscriptions.
     */
    cursor?: ShopSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopSubscriptions.
     */
    skip?: number
    distinct?: ShopSubscriptionScalarFieldEnum | ShopSubscriptionScalarFieldEnum[]
  }

  /**
   * ShopSubscription create
   */
  export type ShopSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopSubscription.
     */
    data: XOR<ShopSubscriptionCreateInput, ShopSubscriptionUncheckedCreateInput>
  }

  /**
   * ShopSubscription createMany
   */
  export type ShopSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopSubscriptions.
     */
    data: ShopSubscriptionCreateManyInput | ShopSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopSubscription createManyAndReturn
   */
  export type ShopSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many ShopSubscriptions.
     */
    data: ShopSubscriptionCreateManyInput | ShopSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopSubscription update
   */
  export type ShopSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopSubscription.
     */
    data: XOR<ShopSubscriptionUpdateInput, ShopSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which ShopSubscription to update.
     */
    where: ShopSubscriptionWhereUniqueInput
  }

  /**
   * ShopSubscription updateMany
   */
  export type ShopSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopSubscriptions.
     */
    data: XOR<ShopSubscriptionUpdateManyMutationInput, ShopSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which ShopSubscriptions to update
     */
    where?: ShopSubscriptionWhereInput
    /**
     * Limit how many ShopSubscriptions to update.
     */
    limit?: number
  }

  /**
   * ShopSubscription updateManyAndReturn
   */
  export type ShopSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update ShopSubscriptions.
     */
    data: XOR<ShopSubscriptionUpdateManyMutationInput, ShopSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which ShopSubscriptions to update
     */
    where?: ShopSubscriptionWhereInput
    /**
     * Limit how many ShopSubscriptions to update.
     */
    limit?: number
  }

  /**
   * ShopSubscription upsert
   */
  export type ShopSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopSubscription to update in case it exists.
     */
    where: ShopSubscriptionWhereUniqueInput
    /**
     * In case the ShopSubscription found by the `where` argument doesn't exist, create a new ShopSubscription with this data.
     */
    create: XOR<ShopSubscriptionCreateInput, ShopSubscriptionUncheckedCreateInput>
    /**
     * In case the ShopSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopSubscriptionUpdateInput, ShopSubscriptionUncheckedUpdateInput>
  }

  /**
   * ShopSubscription delete
   */
  export type ShopSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
    /**
     * Filter which ShopSubscription to delete.
     */
    where: ShopSubscriptionWhereUniqueInput
  }

  /**
   * ShopSubscription deleteMany
   */
  export type ShopSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopSubscriptions to delete
     */
    where?: ShopSubscriptionWhereInput
    /**
     * Limit how many ShopSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * ShopSubscription.settings
   */
  export type ShopSubscription$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    where?: CartSettingsWhereInput
  }

  /**
   * ShopSubscription without action
   */
  export type ShopSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopSubscription
     */
    select?: ShopSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopSubscription
     */
    omit?: ShopSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopSubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model CartSettings
   */

  export type AggregateCartSettings = {
    _count: CartSettingsCountAggregateOutputType | null
    _avg: CartSettingsAvgAggregateOutputType | null
    _sum: CartSettingsSumAggregateOutputType | null
    _min: CartSettingsMinAggregateOutputType | null
    _max: CartSettingsMaxAggregateOutputType | null
  }

  export type CartSettingsAvgAggregateOutputType = {
    timerMinutes: number | null
    freeShippingThreshold: number | null
    giftWrapPrice: number | null
  }

  export type CartSettingsSumAggregateOutputType = {
    timerMinutes: number | null
    freeShippingThreshold: number | null
    giftWrapPrice: number | null
  }

  export type CartSettingsMinAggregateOutputType = {
    id: string | null
    shop: string | null
    backgroundColor: string | null
    buttonColor: string | null
    buttonTextKey: string | null
    enableTimer: boolean | null
    timerMinutes: number | null
    enableFreeShippingBar: boolean | null
    freeShippingThreshold: number | null
    enableGiftWrap: boolean | null
    giftWrapPrice: number | null
    enableUpsell: boolean | null
    enableDynamicDiscounts: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartSettingsMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    backgroundColor: string | null
    buttonColor: string | null
    buttonTextKey: string | null
    enableTimer: boolean | null
    timerMinutes: number | null
    enableFreeShippingBar: boolean | null
    freeShippingThreshold: number | null
    enableGiftWrap: boolean | null
    giftWrapPrice: number | null
    enableUpsell: boolean | null
    enableDynamicDiscounts: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartSettingsCountAggregateOutputType = {
    id: number
    shop: number
    backgroundColor: number
    buttonColor: number
    buttonTextKey: number
    enableTimer: number
    timerMinutes: number
    enableFreeShippingBar: number
    freeShippingThreshold: number
    enableGiftWrap: number
    giftWrapPrice: number
    enableUpsell: number
    upsellProductIds: number
    enableDynamicDiscounts: number
    discountRules: number
    modules: number
    moduleOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartSettingsAvgAggregateInputType = {
    timerMinutes?: true
    freeShippingThreshold?: true
    giftWrapPrice?: true
  }

  export type CartSettingsSumAggregateInputType = {
    timerMinutes?: true
    freeShippingThreshold?: true
    giftWrapPrice?: true
  }

  export type CartSettingsMinAggregateInputType = {
    id?: true
    shop?: true
    backgroundColor?: true
    buttonColor?: true
    buttonTextKey?: true
    enableTimer?: true
    timerMinutes?: true
    enableFreeShippingBar?: true
    freeShippingThreshold?: true
    enableGiftWrap?: true
    giftWrapPrice?: true
    enableUpsell?: true
    enableDynamicDiscounts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartSettingsMaxAggregateInputType = {
    id?: true
    shop?: true
    backgroundColor?: true
    buttonColor?: true
    buttonTextKey?: true
    enableTimer?: true
    timerMinutes?: true
    enableFreeShippingBar?: true
    freeShippingThreshold?: true
    enableGiftWrap?: true
    giftWrapPrice?: true
    enableUpsell?: true
    enableDynamicDiscounts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartSettingsCountAggregateInputType = {
    id?: true
    shop?: true
    backgroundColor?: true
    buttonColor?: true
    buttonTextKey?: true
    enableTimer?: true
    timerMinutes?: true
    enableFreeShippingBar?: true
    freeShippingThreshold?: true
    enableGiftWrap?: true
    giftWrapPrice?: true
    enableUpsell?: true
    upsellProductIds?: true
    enableDynamicDiscounts?: true
    discountRules?: true
    modules?: true
    moduleOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartSettings to aggregate.
     */
    where?: CartSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartSettings to fetch.
     */
    orderBy?: CartSettingsOrderByWithRelationInput | CartSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartSettings
    **/
    _count?: true | CartSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartSettingsMaxAggregateInputType
  }

  export type GetCartSettingsAggregateType<T extends CartSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateCartSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartSettings[P]>
      : GetScalarType<T[P], AggregateCartSettings[P]>
  }




  export type CartSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartSettingsWhereInput
    orderBy?: CartSettingsOrderByWithAggregationInput | CartSettingsOrderByWithAggregationInput[]
    by: CartSettingsScalarFieldEnum[] | CartSettingsScalarFieldEnum
    having?: CartSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartSettingsCountAggregateInputType | true
    _avg?: CartSettingsAvgAggregateInputType
    _sum?: CartSettingsSumAggregateInputType
    _min?: CartSettingsMinAggregateInputType
    _max?: CartSettingsMaxAggregateInputType
  }

  export type CartSettingsGroupByOutputType = {
    id: string
    shop: string
    backgroundColor: string
    buttonColor: string
    buttonTextKey: string
    enableTimer: boolean
    timerMinutes: number
    enableFreeShippingBar: boolean
    freeShippingThreshold: number
    enableGiftWrap: boolean
    giftWrapPrice: number
    enableUpsell: boolean
    upsellProductIds: JsonValue
    enableDynamicDiscounts: boolean
    discountRules: JsonValue
    modules: JsonValue
    moduleOrder: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: CartSettingsCountAggregateOutputType | null
    _avg: CartSettingsAvgAggregateOutputType | null
    _sum: CartSettingsSumAggregateOutputType | null
    _min: CartSettingsMinAggregateOutputType | null
    _max: CartSettingsMaxAggregateOutputType | null
  }

  type GetCartSettingsGroupByPayload<T extends CartSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], CartSettingsGroupByOutputType[P]>
        }
      >
    >


  export type CartSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    backgroundColor?: boolean
    buttonColor?: boolean
    buttonTextKey?: boolean
    enableTimer?: boolean
    timerMinutes?: boolean
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: boolean
    enableGiftWrap?: boolean
    giftWrapPrice?: boolean
    enableUpsell?: boolean
    upsellProductIds?: boolean
    enableDynamicDiscounts?: boolean
    discountRules?: boolean
    modules?: boolean
    moduleOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartSettings"]>

  export type CartSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    backgroundColor?: boolean
    buttonColor?: boolean
    buttonTextKey?: boolean
    enableTimer?: boolean
    timerMinutes?: boolean
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: boolean
    enableGiftWrap?: boolean
    giftWrapPrice?: boolean
    enableUpsell?: boolean
    upsellProductIds?: boolean
    enableDynamicDiscounts?: boolean
    discountRules?: boolean
    modules?: boolean
    moduleOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartSettings"]>

  export type CartSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    backgroundColor?: boolean
    buttonColor?: boolean
    buttonTextKey?: boolean
    enableTimer?: boolean
    timerMinutes?: boolean
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: boolean
    enableGiftWrap?: boolean
    giftWrapPrice?: boolean
    enableUpsell?: boolean
    upsellProductIds?: boolean
    enableDynamicDiscounts?: boolean
    discountRules?: boolean
    modules?: boolean
    moduleOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartSettings"]>

  export type CartSettingsSelectScalar = {
    id?: boolean
    shop?: boolean
    backgroundColor?: boolean
    buttonColor?: boolean
    buttonTextKey?: boolean
    enableTimer?: boolean
    timerMinutes?: boolean
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: boolean
    enableGiftWrap?: boolean
    giftWrapPrice?: boolean
    enableUpsell?: boolean
    upsellProductIds?: boolean
    enableDynamicDiscounts?: boolean
    discountRules?: boolean
    modules?: boolean
    moduleOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "backgroundColor" | "buttonColor" | "buttonTextKey" | "enableTimer" | "timerMinutes" | "enableFreeShippingBar" | "freeShippingThreshold" | "enableGiftWrap" | "giftWrapPrice" | "enableUpsell" | "upsellProductIds" | "enableDynamicDiscounts" | "discountRules" | "modules" | "moduleOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["cartSettings"]>
  export type CartSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }
  export type CartSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }
  export type CartSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | ShopSubscriptionDefaultArgs<ExtArgs>
  }

  export type $CartSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartSettings"
    objects: {
      subscription: Prisma.$ShopSubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      backgroundColor: string
      buttonColor: string
      buttonTextKey: string
      enableTimer: boolean
      timerMinutes: number
      enableFreeShippingBar: boolean
      freeShippingThreshold: number
      enableGiftWrap: boolean
      giftWrapPrice: number
      enableUpsell: boolean
      upsellProductIds: Prisma.JsonValue
      enableDynamicDiscounts: boolean
      discountRules: Prisma.JsonValue
      modules: Prisma.JsonValue
      moduleOrder: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cartSettings"]>
    composites: {}
  }

  type CartSettingsGetPayload<S extends boolean | null | undefined | CartSettingsDefaultArgs> = $Result.GetResult<Prisma.$CartSettingsPayload, S>

  type CartSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartSettingsCountAggregateInputType | true
    }

  export interface CartSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartSettings'], meta: { name: 'CartSettings' } }
    /**
     * Find zero or one CartSettings that matches the filter.
     * @param {CartSettingsFindUniqueArgs} args - Arguments to find a CartSettings
     * @example
     * // Get one CartSettings
     * const cartSettings = await prisma.cartSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartSettingsFindUniqueArgs>(args: SelectSubset<T, CartSettingsFindUniqueArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CartSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartSettingsFindUniqueOrThrowArgs} args - Arguments to find a CartSettings
     * @example
     * // Get one CartSettings
     * const cartSettings = await prisma.cartSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, CartSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsFindFirstArgs} args - Arguments to find a CartSettings
     * @example
     * // Get one CartSettings
     * const cartSettings = await prisma.cartSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartSettingsFindFirstArgs>(args?: SelectSubset<T, CartSettingsFindFirstArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsFindFirstOrThrowArgs} args - Arguments to find a CartSettings
     * @example
     * // Get one CartSettings
     * const cartSettings = await prisma.cartSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, CartSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CartSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartSettings
     * const cartSettings = await prisma.cartSettings.findMany()
     * 
     * // Get first 10 CartSettings
     * const cartSettings = await prisma.cartSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartSettingsWithIdOnly = await prisma.cartSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartSettingsFindManyArgs>(args?: SelectSubset<T, CartSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CartSettings.
     * @param {CartSettingsCreateArgs} args - Arguments to create a CartSettings.
     * @example
     * // Create one CartSettings
     * const CartSettings = await prisma.cartSettings.create({
     *   data: {
     *     // ... data to create a CartSettings
     *   }
     * })
     * 
     */
    create<T extends CartSettingsCreateArgs>(args: SelectSubset<T, CartSettingsCreateArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CartSettings.
     * @param {CartSettingsCreateManyArgs} args - Arguments to create many CartSettings.
     * @example
     * // Create many CartSettings
     * const cartSettings = await prisma.cartSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartSettingsCreateManyArgs>(args?: SelectSubset<T, CartSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartSettings and returns the data saved in the database.
     * @param {CartSettingsCreateManyAndReturnArgs} args - Arguments to create many CartSettings.
     * @example
     * // Create many CartSettings
     * const cartSettings = await prisma.cartSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartSettings and only return the `id`
     * const cartSettingsWithIdOnly = await prisma.cartSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, CartSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CartSettings.
     * @param {CartSettingsDeleteArgs} args - Arguments to delete one CartSettings.
     * @example
     * // Delete one CartSettings
     * const CartSettings = await prisma.cartSettings.delete({
     *   where: {
     *     // ... filter to delete one CartSettings
     *   }
     * })
     * 
     */
    delete<T extends CartSettingsDeleteArgs>(args: SelectSubset<T, CartSettingsDeleteArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CartSettings.
     * @param {CartSettingsUpdateArgs} args - Arguments to update one CartSettings.
     * @example
     * // Update one CartSettings
     * const cartSettings = await prisma.cartSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartSettingsUpdateArgs>(args: SelectSubset<T, CartSettingsUpdateArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CartSettings.
     * @param {CartSettingsDeleteManyArgs} args - Arguments to filter CartSettings to delete.
     * @example
     * // Delete a few CartSettings
     * const { count } = await prisma.cartSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartSettingsDeleteManyArgs>(args?: SelectSubset<T, CartSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartSettings
     * const cartSettings = await prisma.cartSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartSettingsUpdateManyArgs>(args: SelectSubset<T, CartSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartSettings and returns the data updated in the database.
     * @param {CartSettingsUpdateManyAndReturnArgs} args - Arguments to update many CartSettings.
     * @example
     * // Update many CartSettings
     * const cartSettings = await prisma.cartSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CartSettings and only return the `id`
     * const cartSettingsWithIdOnly = await prisma.cartSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CartSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, CartSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CartSettings.
     * @param {CartSettingsUpsertArgs} args - Arguments to update or create a CartSettings.
     * @example
     * // Update or create a CartSettings
     * const cartSettings = await prisma.cartSettings.upsert({
     *   create: {
     *     // ... data to create a CartSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartSettings we want to update
     *   }
     * })
     */
    upsert<T extends CartSettingsUpsertArgs>(args: SelectSubset<T, CartSettingsUpsertArgs<ExtArgs>>): Prisma__CartSettingsClient<$Result.GetResult<Prisma.$CartSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CartSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsCountArgs} args - Arguments to filter CartSettings to count.
     * @example
     * // Count the number of CartSettings
     * const count = await prisma.cartSettings.count({
     *   where: {
     *     // ... the filter for the CartSettings we want to count
     *   }
     * })
    **/
    count<T extends CartSettingsCountArgs>(
      args?: Subset<T, CartSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartSettingsAggregateArgs>(args: Subset<T, CartSettingsAggregateArgs>): Prisma.PrismaPromise<GetCartSettingsAggregateType<T>>

    /**
     * Group by CartSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartSettingsGroupByArgs['orderBy'] }
        : { orderBy?: CartSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartSettings model
   */
  readonly fields: CartSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends ShopSubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopSubscriptionDefaultArgs<ExtArgs>>): Prisma__ShopSubscriptionClient<$Result.GetResult<Prisma.$ShopSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CartSettings model
   */
  interface CartSettingsFieldRefs {
    readonly id: FieldRef<"CartSettings", 'String'>
    readonly shop: FieldRef<"CartSettings", 'String'>
    readonly backgroundColor: FieldRef<"CartSettings", 'String'>
    readonly buttonColor: FieldRef<"CartSettings", 'String'>
    readonly buttonTextKey: FieldRef<"CartSettings", 'String'>
    readonly enableTimer: FieldRef<"CartSettings", 'Boolean'>
    readonly timerMinutes: FieldRef<"CartSettings", 'Int'>
    readonly enableFreeShippingBar: FieldRef<"CartSettings", 'Boolean'>
    readonly freeShippingThreshold: FieldRef<"CartSettings", 'Float'>
    readonly enableGiftWrap: FieldRef<"CartSettings", 'Boolean'>
    readonly giftWrapPrice: FieldRef<"CartSettings", 'Float'>
    readonly enableUpsell: FieldRef<"CartSettings", 'Boolean'>
    readonly upsellProductIds: FieldRef<"CartSettings", 'Json'>
    readonly enableDynamicDiscounts: FieldRef<"CartSettings", 'Boolean'>
    readonly discountRules: FieldRef<"CartSettings", 'Json'>
    readonly modules: FieldRef<"CartSettings", 'Json'>
    readonly moduleOrder: FieldRef<"CartSettings", 'Json'>
    readonly createdAt: FieldRef<"CartSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"CartSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartSettings findUnique
   */
  export type CartSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter, which CartSettings to fetch.
     */
    where: CartSettingsWhereUniqueInput
  }

  /**
   * CartSettings findUniqueOrThrow
   */
  export type CartSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter, which CartSettings to fetch.
     */
    where: CartSettingsWhereUniqueInput
  }

  /**
   * CartSettings findFirst
   */
  export type CartSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter, which CartSettings to fetch.
     */
    where?: CartSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartSettings to fetch.
     */
    orderBy?: CartSettingsOrderByWithRelationInput | CartSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartSettings.
     */
    cursor?: CartSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartSettings.
     */
    distinct?: CartSettingsScalarFieldEnum | CartSettingsScalarFieldEnum[]
  }

  /**
   * CartSettings findFirstOrThrow
   */
  export type CartSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter, which CartSettings to fetch.
     */
    where?: CartSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartSettings to fetch.
     */
    orderBy?: CartSettingsOrderByWithRelationInput | CartSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartSettings.
     */
    cursor?: CartSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartSettings.
     */
    distinct?: CartSettingsScalarFieldEnum | CartSettingsScalarFieldEnum[]
  }

  /**
   * CartSettings findMany
   */
  export type CartSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter, which CartSettings to fetch.
     */
    where?: CartSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartSettings to fetch.
     */
    orderBy?: CartSettingsOrderByWithRelationInput | CartSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartSettings.
     */
    cursor?: CartSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartSettings.
     */
    skip?: number
    distinct?: CartSettingsScalarFieldEnum | CartSettingsScalarFieldEnum[]
  }

  /**
   * CartSettings create
   */
  export type CartSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a CartSettings.
     */
    data: XOR<CartSettingsCreateInput, CartSettingsUncheckedCreateInput>
  }

  /**
   * CartSettings createMany
   */
  export type CartSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartSettings.
     */
    data: CartSettingsCreateManyInput | CartSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartSettings createManyAndReturn
   */
  export type CartSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many CartSettings.
     */
    data: CartSettingsCreateManyInput | CartSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartSettings update
   */
  export type CartSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a CartSettings.
     */
    data: XOR<CartSettingsUpdateInput, CartSettingsUncheckedUpdateInput>
    /**
     * Choose, which CartSettings to update.
     */
    where: CartSettingsWhereUniqueInput
  }

  /**
   * CartSettings updateMany
   */
  export type CartSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartSettings.
     */
    data: XOR<CartSettingsUpdateManyMutationInput, CartSettingsUncheckedUpdateManyInput>
    /**
     * Filter which CartSettings to update
     */
    where?: CartSettingsWhereInput
    /**
     * Limit how many CartSettings to update.
     */
    limit?: number
  }

  /**
   * CartSettings updateManyAndReturn
   */
  export type CartSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * The data used to update CartSettings.
     */
    data: XOR<CartSettingsUpdateManyMutationInput, CartSettingsUncheckedUpdateManyInput>
    /**
     * Filter which CartSettings to update
     */
    where?: CartSettingsWhereInput
    /**
     * Limit how many CartSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartSettings upsert
   */
  export type CartSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the CartSettings to update in case it exists.
     */
    where: CartSettingsWhereUniqueInput
    /**
     * In case the CartSettings found by the `where` argument doesn't exist, create a new CartSettings with this data.
     */
    create: XOR<CartSettingsCreateInput, CartSettingsUncheckedCreateInput>
    /**
     * In case the CartSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartSettingsUpdateInput, CartSettingsUncheckedUpdateInput>
  }

  /**
   * CartSettings delete
   */
  export type CartSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
    /**
     * Filter which CartSettings to delete.
     */
    where: CartSettingsWhereUniqueInput
  }

  /**
   * CartSettings deleteMany
   */
  export type CartSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartSettings to delete
     */
    where?: CartSettingsWhereInput
    /**
     * Limit how many CartSettings to delete.
     */
    limit?: number
  }

  /**
   * CartSettings without action
   */
  export type CartSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartSettings
     */
    select?: CartSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartSettings
     */
    omit?: CartSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartSettingsInclude<ExtArgs> | null
  }


  /**
   * Model CartEvent
   */

  export type AggregateCartEvent = {
    _count: CartEventCountAggregateOutputType | null
    _min: CartEventMinAggregateOutputType | null
    _max: CartEventMaxAggregateOutputType | null
  }

  export type CartEventMinAggregateOutputType = {
    id: string | null
    shop: string | null
    cartId: string | null
    eventType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartEventMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    cartId: string | null
    eventType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartEventCountAggregateOutputType = {
    id: number
    shop: number
    cartId: number
    eventType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartEventMinAggregateInputType = {
    id?: true
    shop?: true
    cartId?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartEventMaxAggregateInputType = {
    id?: true
    shop?: true
    cartId?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartEventCountAggregateInputType = {
    id?: true
    shop?: true
    cartId?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartEvent to aggregate.
     */
    where?: CartEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartEvents to fetch.
     */
    orderBy?: CartEventOrderByWithRelationInput | CartEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartEvents
    **/
    _count?: true | CartEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartEventMaxAggregateInputType
  }

  export type GetCartEventAggregateType<T extends CartEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCartEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartEvent[P]>
      : GetScalarType<T[P], AggregateCartEvent[P]>
  }




  export type CartEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartEventWhereInput
    orderBy?: CartEventOrderByWithAggregationInput | CartEventOrderByWithAggregationInput[]
    by: CartEventScalarFieldEnum[] | CartEventScalarFieldEnum
    having?: CartEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartEventCountAggregateInputType | true
    _min?: CartEventMinAggregateInputType
    _max?: CartEventMaxAggregateInputType
  }

  export type CartEventGroupByOutputType = {
    id: string
    shop: string
    cartId: string
    eventType: string
    createdAt: Date
    updatedAt: Date
    _count: CartEventCountAggregateOutputType | null
    _min: CartEventMinAggregateOutputType | null
    _max: CartEventMaxAggregateOutputType | null
  }

  type GetCartEventGroupByPayload<T extends CartEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartEventGroupByOutputType[P]>
            : GetScalarType<T[P], CartEventGroupByOutputType[P]>
        }
      >
    >


  export type CartEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    cartId?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cartEvent"]>

  export type CartEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    cartId?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cartEvent"]>

  export type CartEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    cartId?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cartEvent"]>

  export type CartEventSelectScalar = {
    id?: boolean
    shop?: boolean
    cartId?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "cartId" | "eventType" | "createdAt" | "updatedAt", ExtArgs["result"]["cartEvent"]>

  export type $CartEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      cartId: string
      eventType: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cartEvent"]>
    composites: {}
  }

  type CartEventGetPayload<S extends boolean | null | undefined | CartEventDefaultArgs> = $Result.GetResult<Prisma.$CartEventPayload, S>

  type CartEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartEventCountAggregateInputType | true
    }

  export interface CartEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartEvent'], meta: { name: 'CartEvent' } }
    /**
     * Find zero or one CartEvent that matches the filter.
     * @param {CartEventFindUniqueArgs} args - Arguments to find a CartEvent
     * @example
     * // Get one CartEvent
     * const cartEvent = await prisma.cartEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartEventFindUniqueArgs>(args: SelectSubset<T, CartEventFindUniqueArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CartEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartEventFindUniqueOrThrowArgs} args - Arguments to find a CartEvent
     * @example
     * // Get one CartEvent
     * const cartEvent = await prisma.cartEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CartEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventFindFirstArgs} args - Arguments to find a CartEvent
     * @example
     * // Get one CartEvent
     * const cartEvent = await prisma.cartEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartEventFindFirstArgs>(args?: SelectSubset<T, CartEventFindFirstArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventFindFirstOrThrowArgs} args - Arguments to find a CartEvent
     * @example
     * // Get one CartEvent
     * const cartEvent = await prisma.cartEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CartEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CartEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartEvents
     * const cartEvents = await prisma.cartEvent.findMany()
     * 
     * // Get first 10 CartEvents
     * const cartEvents = await prisma.cartEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartEventWithIdOnly = await prisma.cartEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartEventFindManyArgs>(args?: SelectSubset<T, CartEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CartEvent.
     * @param {CartEventCreateArgs} args - Arguments to create a CartEvent.
     * @example
     * // Create one CartEvent
     * const CartEvent = await prisma.cartEvent.create({
     *   data: {
     *     // ... data to create a CartEvent
     *   }
     * })
     * 
     */
    create<T extends CartEventCreateArgs>(args: SelectSubset<T, CartEventCreateArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CartEvents.
     * @param {CartEventCreateManyArgs} args - Arguments to create many CartEvents.
     * @example
     * // Create many CartEvents
     * const cartEvent = await prisma.cartEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartEventCreateManyArgs>(args?: SelectSubset<T, CartEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartEvents and returns the data saved in the database.
     * @param {CartEventCreateManyAndReturnArgs} args - Arguments to create many CartEvents.
     * @example
     * // Create many CartEvents
     * const cartEvent = await prisma.cartEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartEvents and only return the `id`
     * const cartEventWithIdOnly = await prisma.cartEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CartEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CartEvent.
     * @param {CartEventDeleteArgs} args - Arguments to delete one CartEvent.
     * @example
     * // Delete one CartEvent
     * const CartEvent = await prisma.cartEvent.delete({
     *   where: {
     *     // ... filter to delete one CartEvent
     *   }
     * })
     * 
     */
    delete<T extends CartEventDeleteArgs>(args: SelectSubset<T, CartEventDeleteArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CartEvent.
     * @param {CartEventUpdateArgs} args - Arguments to update one CartEvent.
     * @example
     * // Update one CartEvent
     * const cartEvent = await prisma.cartEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartEventUpdateArgs>(args: SelectSubset<T, CartEventUpdateArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CartEvents.
     * @param {CartEventDeleteManyArgs} args - Arguments to filter CartEvents to delete.
     * @example
     * // Delete a few CartEvents
     * const { count } = await prisma.cartEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartEventDeleteManyArgs>(args?: SelectSubset<T, CartEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartEvents
     * const cartEvent = await prisma.cartEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartEventUpdateManyArgs>(args: SelectSubset<T, CartEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartEvents and returns the data updated in the database.
     * @param {CartEventUpdateManyAndReturnArgs} args - Arguments to update many CartEvents.
     * @example
     * // Update many CartEvents
     * const cartEvent = await prisma.cartEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CartEvents and only return the `id`
     * const cartEventWithIdOnly = await prisma.cartEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CartEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CartEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CartEvent.
     * @param {CartEventUpsertArgs} args - Arguments to update or create a CartEvent.
     * @example
     * // Update or create a CartEvent
     * const cartEvent = await prisma.cartEvent.upsert({
     *   create: {
     *     // ... data to create a CartEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartEvent we want to update
     *   }
     * })
     */
    upsert<T extends CartEventUpsertArgs>(args: SelectSubset<T, CartEventUpsertArgs<ExtArgs>>): Prisma__CartEventClient<$Result.GetResult<Prisma.$CartEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CartEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventCountArgs} args - Arguments to filter CartEvents to count.
     * @example
     * // Count the number of CartEvents
     * const count = await prisma.cartEvent.count({
     *   where: {
     *     // ... the filter for the CartEvents we want to count
     *   }
     * })
    **/
    count<T extends CartEventCountArgs>(
      args?: Subset<T, CartEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartEventAggregateArgs>(args: Subset<T, CartEventAggregateArgs>): Prisma.PrismaPromise<GetCartEventAggregateType<T>>

    /**
     * Group by CartEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartEventGroupByArgs['orderBy'] }
        : { orderBy?: CartEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartEvent model
   */
  readonly fields: CartEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CartEvent model
   */
  interface CartEventFieldRefs {
    readonly id: FieldRef<"CartEvent", 'String'>
    readonly shop: FieldRef<"CartEvent", 'String'>
    readonly cartId: FieldRef<"CartEvent", 'String'>
    readonly eventType: FieldRef<"CartEvent", 'String'>
    readonly createdAt: FieldRef<"CartEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CartEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartEvent findUnique
   */
  export type CartEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter, which CartEvent to fetch.
     */
    where: CartEventWhereUniqueInput
  }

  /**
   * CartEvent findUniqueOrThrow
   */
  export type CartEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter, which CartEvent to fetch.
     */
    where: CartEventWhereUniqueInput
  }

  /**
   * CartEvent findFirst
   */
  export type CartEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter, which CartEvent to fetch.
     */
    where?: CartEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartEvents to fetch.
     */
    orderBy?: CartEventOrderByWithRelationInput | CartEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartEvents.
     */
    cursor?: CartEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartEvents.
     */
    distinct?: CartEventScalarFieldEnum | CartEventScalarFieldEnum[]
  }

  /**
   * CartEvent findFirstOrThrow
   */
  export type CartEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter, which CartEvent to fetch.
     */
    where?: CartEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartEvents to fetch.
     */
    orderBy?: CartEventOrderByWithRelationInput | CartEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartEvents.
     */
    cursor?: CartEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartEvents.
     */
    distinct?: CartEventScalarFieldEnum | CartEventScalarFieldEnum[]
  }

  /**
   * CartEvent findMany
   */
  export type CartEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter, which CartEvents to fetch.
     */
    where?: CartEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartEvents to fetch.
     */
    orderBy?: CartEventOrderByWithRelationInput | CartEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartEvents.
     */
    cursor?: CartEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartEvents.
     */
    skip?: number
    distinct?: CartEventScalarFieldEnum | CartEventScalarFieldEnum[]
  }

  /**
   * CartEvent create
   */
  export type CartEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * The data needed to create a CartEvent.
     */
    data: XOR<CartEventCreateInput, CartEventUncheckedCreateInput>
  }

  /**
   * CartEvent createMany
   */
  export type CartEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartEvents.
     */
    data: CartEventCreateManyInput | CartEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartEvent createManyAndReturn
   */
  export type CartEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * The data used to create many CartEvents.
     */
    data: CartEventCreateManyInput | CartEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartEvent update
   */
  export type CartEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * The data needed to update a CartEvent.
     */
    data: XOR<CartEventUpdateInput, CartEventUncheckedUpdateInput>
    /**
     * Choose, which CartEvent to update.
     */
    where: CartEventWhereUniqueInput
  }

  /**
   * CartEvent updateMany
   */
  export type CartEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartEvents.
     */
    data: XOR<CartEventUpdateManyMutationInput, CartEventUncheckedUpdateManyInput>
    /**
     * Filter which CartEvents to update
     */
    where?: CartEventWhereInput
    /**
     * Limit how many CartEvents to update.
     */
    limit?: number
  }

  /**
   * CartEvent updateManyAndReturn
   */
  export type CartEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * The data used to update CartEvents.
     */
    data: XOR<CartEventUpdateManyMutationInput, CartEventUncheckedUpdateManyInput>
    /**
     * Filter which CartEvents to update
     */
    where?: CartEventWhereInput
    /**
     * Limit how many CartEvents to update.
     */
    limit?: number
  }

  /**
   * CartEvent upsert
   */
  export type CartEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * The filter to search for the CartEvent to update in case it exists.
     */
    where: CartEventWhereUniqueInput
    /**
     * In case the CartEvent found by the `where` argument doesn't exist, create a new CartEvent with this data.
     */
    create: XOR<CartEventCreateInput, CartEventUncheckedCreateInput>
    /**
     * In case the CartEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartEventUpdateInput, CartEventUncheckedUpdateInput>
  }

  /**
   * CartEvent delete
   */
  export type CartEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
    /**
     * Filter which CartEvent to delete.
     */
    where: CartEventWhereUniqueInput
  }

  /**
   * CartEvent deleteMany
   */
  export type CartEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartEvents to delete
     */
    where?: CartEventWhereInput
    /**
     * Limit how many CartEvents to delete.
     */
    limit?: number
  }

  /**
   * CartEvent without action
   */
  export type CartEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartEvent
     */
    select?: CartEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartEvent
     */
    omit?: CartEventOmit<ExtArgs> | null
  }


  /**
   * Model UpsellEvent
   */

  export type AggregateUpsellEvent = {
    _count: UpsellEventCountAggregateOutputType | null
    _min: UpsellEventMinAggregateOutputType | null
    _max: UpsellEventMaxAggregateOutputType | null
  }

  export type UpsellEventMinAggregateOutputType = {
    id: string | null
    shop: string | null
    productId: string | null
    productTitle: string | null
    variantId: string | null
    eventType: string | null
    orderId: string | null
    createdAt: Date | null
  }

  export type UpsellEventMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    productId: string | null
    productTitle: string | null
    variantId: string | null
    eventType: string | null
    orderId: string | null
    createdAt: Date | null
  }

  export type UpsellEventCountAggregateOutputType = {
    id: number
    shop: number
    productId: number
    productTitle: number
    variantId: number
    eventType: number
    orderId: number
    createdAt: number
    _all: number
  }


  export type UpsellEventMinAggregateInputType = {
    id?: true
    shop?: true
    productId?: true
    productTitle?: true
    variantId?: true
    eventType?: true
    orderId?: true
    createdAt?: true
  }

  export type UpsellEventMaxAggregateInputType = {
    id?: true
    shop?: true
    productId?: true
    productTitle?: true
    variantId?: true
    eventType?: true
    orderId?: true
    createdAt?: true
  }

  export type UpsellEventCountAggregateInputType = {
    id?: true
    shop?: true
    productId?: true
    productTitle?: true
    variantId?: true
    eventType?: true
    orderId?: true
    createdAt?: true
    _all?: true
  }

  export type UpsellEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UpsellEvent to aggregate.
     */
    where?: UpsellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpsellEvents to fetch.
     */
    orderBy?: UpsellEventOrderByWithRelationInput | UpsellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UpsellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpsellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpsellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UpsellEvents
    **/
    _count?: true | UpsellEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UpsellEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UpsellEventMaxAggregateInputType
  }

  export type GetUpsellEventAggregateType<T extends UpsellEventAggregateArgs> = {
        [P in keyof T & keyof AggregateUpsellEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpsellEvent[P]>
      : GetScalarType<T[P], AggregateUpsellEvent[P]>
  }




  export type UpsellEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpsellEventWhereInput
    orderBy?: UpsellEventOrderByWithAggregationInput | UpsellEventOrderByWithAggregationInput[]
    by: UpsellEventScalarFieldEnum[] | UpsellEventScalarFieldEnum
    having?: UpsellEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UpsellEventCountAggregateInputType | true
    _min?: UpsellEventMinAggregateInputType
    _max?: UpsellEventMaxAggregateInputType
  }

  export type UpsellEventGroupByOutputType = {
    id: string
    shop: string
    productId: string
    productTitle: string
    variantId: string
    eventType: string
    orderId: string | null
    createdAt: Date
    _count: UpsellEventCountAggregateOutputType | null
    _min: UpsellEventMinAggregateOutputType | null
    _max: UpsellEventMaxAggregateOutputType | null
  }

  type GetUpsellEventGroupByPayload<T extends UpsellEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UpsellEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UpsellEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UpsellEventGroupByOutputType[P]>
            : GetScalarType<T[P], UpsellEventGroupByOutputType[P]>
        }
      >
    >


  export type UpsellEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    productId?: boolean
    productTitle?: boolean
    variantId?: boolean
    eventType?: boolean
    orderId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["upsellEvent"]>

  export type UpsellEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    productId?: boolean
    productTitle?: boolean
    variantId?: boolean
    eventType?: boolean
    orderId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["upsellEvent"]>

  export type UpsellEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    productId?: boolean
    productTitle?: boolean
    variantId?: boolean
    eventType?: boolean
    orderId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["upsellEvent"]>

  export type UpsellEventSelectScalar = {
    id?: boolean
    shop?: boolean
    productId?: boolean
    productTitle?: boolean
    variantId?: boolean
    eventType?: boolean
    orderId?: boolean
    createdAt?: boolean
  }

  export type UpsellEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "productId" | "productTitle" | "variantId" | "eventType" | "orderId" | "createdAt", ExtArgs["result"]["upsellEvent"]>

  export type $UpsellEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UpsellEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      productId: string
      productTitle: string
      variantId: string
      eventType: string
      orderId: string | null
      createdAt: Date
    }, ExtArgs["result"]["upsellEvent"]>
    composites: {}
  }

  type UpsellEventGetPayload<S extends boolean | null | undefined | UpsellEventDefaultArgs> = $Result.GetResult<Prisma.$UpsellEventPayload, S>

  type UpsellEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UpsellEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UpsellEventCountAggregateInputType | true
    }

  export interface UpsellEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UpsellEvent'], meta: { name: 'UpsellEvent' } }
    /**
     * Find zero or one UpsellEvent that matches the filter.
     * @param {UpsellEventFindUniqueArgs} args - Arguments to find a UpsellEvent
     * @example
     * // Get one UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UpsellEventFindUniqueArgs>(args: SelectSubset<T, UpsellEventFindUniqueArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UpsellEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UpsellEventFindUniqueOrThrowArgs} args - Arguments to find a UpsellEvent
     * @example
     * // Get one UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UpsellEventFindUniqueOrThrowArgs>(args: SelectSubset<T, UpsellEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UpsellEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventFindFirstArgs} args - Arguments to find a UpsellEvent
     * @example
     * // Get one UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UpsellEventFindFirstArgs>(args?: SelectSubset<T, UpsellEventFindFirstArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UpsellEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventFindFirstOrThrowArgs} args - Arguments to find a UpsellEvent
     * @example
     * // Get one UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UpsellEventFindFirstOrThrowArgs>(args?: SelectSubset<T, UpsellEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UpsellEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UpsellEvents
     * const upsellEvents = await prisma.upsellEvent.findMany()
     * 
     * // Get first 10 UpsellEvents
     * const upsellEvents = await prisma.upsellEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const upsellEventWithIdOnly = await prisma.upsellEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UpsellEventFindManyArgs>(args?: SelectSubset<T, UpsellEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UpsellEvent.
     * @param {UpsellEventCreateArgs} args - Arguments to create a UpsellEvent.
     * @example
     * // Create one UpsellEvent
     * const UpsellEvent = await prisma.upsellEvent.create({
     *   data: {
     *     // ... data to create a UpsellEvent
     *   }
     * })
     * 
     */
    create<T extends UpsellEventCreateArgs>(args: SelectSubset<T, UpsellEventCreateArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UpsellEvents.
     * @param {UpsellEventCreateManyArgs} args - Arguments to create many UpsellEvents.
     * @example
     * // Create many UpsellEvents
     * const upsellEvent = await prisma.upsellEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UpsellEventCreateManyArgs>(args?: SelectSubset<T, UpsellEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UpsellEvents and returns the data saved in the database.
     * @param {UpsellEventCreateManyAndReturnArgs} args - Arguments to create many UpsellEvents.
     * @example
     * // Create many UpsellEvents
     * const upsellEvent = await prisma.upsellEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UpsellEvents and only return the `id`
     * const upsellEventWithIdOnly = await prisma.upsellEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UpsellEventCreateManyAndReturnArgs>(args?: SelectSubset<T, UpsellEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UpsellEvent.
     * @param {UpsellEventDeleteArgs} args - Arguments to delete one UpsellEvent.
     * @example
     * // Delete one UpsellEvent
     * const UpsellEvent = await prisma.upsellEvent.delete({
     *   where: {
     *     // ... filter to delete one UpsellEvent
     *   }
     * })
     * 
     */
    delete<T extends UpsellEventDeleteArgs>(args: SelectSubset<T, UpsellEventDeleteArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UpsellEvent.
     * @param {UpsellEventUpdateArgs} args - Arguments to update one UpsellEvent.
     * @example
     * // Update one UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UpsellEventUpdateArgs>(args: SelectSubset<T, UpsellEventUpdateArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UpsellEvents.
     * @param {UpsellEventDeleteManyArgs} args - Arguments to filter UpsellEvents to delete.
     * @example
     * // Delete a few UpsellEvents
     * const { count } = await prisma.upsellEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UpsellEventDeleteManyArgs>(args?: SelectSubset<T, UpsellEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UpsellEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UpsellEvents
     * const upsellEvent = await prisma.upsellEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UpsellEventUpdateManyArgs>(args: SelectSubset<T, UpsellEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UpsellEvents and returns the data updated in the database.
     * @param {UpsellEventUpdateManyAndReturnArgs} args - Arguments to update many UpsellEvents.
     * @example
     * // Update many UpsellEvents
     * const upsellEvent = await prisma.upsellEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UpsellEvents and only return the `id`
     * const upsellEventWithIdOnly = await prisma.upsellEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UpsellEventUpdateManyAndReturnArgs>(args: SelectSubset<T, UpsellEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UpsellEvent.
     * @param {UpsellEventUpsertArgs} args - Arguments to update or create a UpsellEvent.
     * @example
     * // Update or create a UpsellEvent
     * const upsellEvent = await prisma.upsellEvent.upsert({
     *   create: {
     *     // ... data to create a UpsellEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UpsellEvent we want to update
     *   }
     * })
     */
    upsert<T extends UpsellEventUpsertArgs>(args: SelectSubset<T, UpsellEventUpsertArgs<ExtArgs>>): Prisma__UpsellEventClient<$Result.GetResult<Prisma.$UpsellEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UpsellEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventCountArgs} args - Arguments to filter UpsellEvents to count.
     * @example
     * // Count the number of UpsellEvents
     * const count = await prisma.upsellEvent.count({
     *   where: {
     *     // ... the filter for the UpsellEvents we want to count
     *   }
     * })
    **/
    count<T extends UpsellEventCountArgs>(
      args?: Subset<T, UpsellEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UpsellEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UpsellEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UpsellEventAggregateArgs>(args: Subset<T, UpsellEventAggregateArgs>): Prisma.PrismaPromise<GetUpsellEventAggregateType<T>>

    /**
     * Group by UpsellEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpsellEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UpsellEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UpsellEventGroupByArgs['orderBy'] }
        : { orderBy?: UpsellEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UpsellEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpsellEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UpsellEvent model
   */
  readonly fields: UpsellEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UpsellEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UpsellEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UpsellEvent model
   */
  interface UpsellEventFieldRefs {
    readonly id: FieldRef<"UpsellEvent", 'String'>
    readonly shop: FieldRef<"UpsellEvent", 'String'>
    readonly productId: FieldRef<"UpsellEvent", 'String'>
    readonly productTitle: FieldRef<"UpsellEvent", 'String'>
    readonly variantId: FieldRef<"UpsellEvent", 'String'>
    readonly eventType: FieldRef<"UpsellEvent", 'String'>
    readonly orderId: FieldRef<"UpsellEvent", 'String'>
    readonly createdAt: FieldRef<"UpsellEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UpsellEvent findUnique
   */
  export type UpsellEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter, which UpsellEvent to fetch.
     */
    where: UpsellEventWhereUniqueInput
  }

  /**
   * UpsellEvent findUniqueOrThrow
   */
  export type UpsellEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter, which UpsellEvent to fetch.
     */
    where: UpsellEventWhereUniqueInput
  }

  /**
   * UpsellEvent findFirst
   */
  export type UpsellEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter, which UpsellEvent to fetch.
     */
    where?: UpsellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpsellEvents to fetch.
     */
    orderBy?: UpsellEventOrderByWithRelationInput | UpsellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UpsellEvents.
     */
    cursor?: UpsellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpsellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpsellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UpsellEvents.
     */
    distinct?: UpsellEventScalarFieldEnum | UpsellEventScalarFieldEnum[]
  }

  /**
   * UpsellEvent findFirstOrThrow
   */
  export type UpsellEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter, which UpsellEvent to fetch.
     */
    where?: UpsellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpsellEvents to fetch.
     */
    orderBy?: UpsellEventOrderByWithRelationInput | UpsellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UpsellEvents.
     */
    cursor?: UpsellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpsellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpsellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UpsellEvents.
     */
    distinct?: UpsellEventScalarFieldEnum | UpsellEventScalarFieldEnum[]
  }

  /**
   * UpsellEvent findMany
   */
  export type UpsellEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter, which UpsellEvents to fetch.
     */
    where?: UpsellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpsellEvents to fetch.
     */
    orderBy?: UpsellEventOrderByWithRelationInput | UpsellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UpsellEvents.
     */
    cursor?: UpsellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpsellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpsellEvents.
     */
    skip?: number
    distinct?: UpsellEventScalarFieldEnum | UpsellEventScalarFieldEnum[]
  }

  /**
   * UpsellEvent create
   */
  export type UpsellEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * The data needed to create a UpsellEvent.
     */
    data: XOR<UpsellEventCreateInput, UpsellEventUncheckedCreateInput>
  }

  /**
   * UpsellEvent createMany
   */
  export type UpsellEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UpsellEvents.
     */
    data: UpsellEventCreateManyInput | UpsellEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UpsellEvent createManyAndReturn
   */
  export type UpsellEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * The data used to create many UpsellEvents.
     */
    data: UpsellEventCreateManyInput | UpsellEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UpsellEvent update
   */
  export type UpsellEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * The data needed to update a UpsellEvent.
     */
    data: XOR<UpsellEventUpdateInput, UpsellEventUncheckedUpdateInput>
    /**
     * Choose, which UpsellEvent to update.
     */
    where: UpsellEventWhereUniqueInput
  }

  /**
   * UpsellEvent updateMany
   */
  export type UpsellEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UpsellEvents.
     */
    data: XOR<UpsellEventUpdateManyMutationInput, UpsellEventUncheckedUpdateManyInput>
    /**
     * Filter which UpsellEvents to update
     */
    where?: UpsellEventWhereInput
    /**
     * Limit how many UpsellEvents to update.
     */
    limit?: number
  }

  /**
   * UpsellEvent updateManyAndReturn
   */
  export type UpsellEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * The data used to update UpsellEvents.
     */
    data: XOR<UpsellEventUpdateManyMutationInput, UpsellEventUncheckedUpdateManyInput>
    /**
     * Filter which UpsellEvents to update
     */
    where?: UpsellEventWhereInput
    /**
     * Limit how many UpsellEvents to update.
     */
    limit?: number
  }

  /**
   * UpsellEvent upsert
   */
  export type UpsellEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * The filter to search for the UpsellEvent to update in case it exists.
     */
    where: UpsellEventWhereUniqueInput
    /**
     * In case the UpsellEvent found by the `where` argument doesn't exist, create a new UpsellEvent with this data.
     */
    create: XOR<UpsellEventCreateInput, UpsellEventUncheckedCreateInput>
    /**
     * In case the UpsellEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UpsellEventUpdateInput, UpsellEventUncheckedUpdateInput>
  }

  /**
   * UpsellEvent delete
   */
  export type UpsellEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
    /**
     * Filter which UpsellEvent to delete.
     */
    where: UpsellEventWhereUniqueInput
  }

  /**
   * UpsellEvent deleteMany
   */
  export type UpsellEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UpsellEvents to delete
     */
    where?: UpsellEventWhereInput
    /**
     * Limit how many UpsellEvents to delete.
     */
    limit?: number
  }

  /**
   * UpsellEvent without action
   */
  export type UpsellEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpsellEvent
     */
    select?: UpsellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpsellEvent
     */
    omit?: UpsellEventOmit<ExtArgs> | null
  }


  /**
   * Model OrderEvent
   */

  export type AggregateOrderEvent = {
    _count: OrderEventCountAggregateOutputType | null
    _avg: OrderEventAvgAggregateOutputType | null
    _sum: OrderEventSumAggregateOutputType | null
    _min: OrderEventMinAggregateOutputType | null
    _max: OrderEventMaxAggregateOutputType | null
  }

  export type OrderEventAvgAggregateOutputType = {
    totalPrice: number | null
  }

  export type OrderEventSumAggregateOutputType = {
    totalPrice: number | null
  }

  export type OrderEventMinAggregateOutputType = {
    id: string | null
    shop: string | null
    orderId: string | null
    totalPrice: number | null
    currency: string | null
    createdAt: Date | null
  }

  export type OrderEventMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    orderId: string | null
    totalPrice: number | null
    currency: string | null
    createdAt: Date | null
  }

  export type OrderEventCountAggregateOutputType = {
    id: number
    shop: number
    orderId: number
    totalPrice: number
    currency: number
    items: number
    createdAt: number
    _all: number
  }


  export type OrderEventAvgAggregateInputType = {
    totalPrice?: true
  }

  export type OrderEventSumAggregateInputType = {
    totalPrice?: true
  }

  export type OrderEventMinAggregateInputType = {
    id?: true
    shop?: true
    orderId?: true
    totalPrice?: true
    currency?: true
    createdAt?: true
  }

  export type OrderEventMaxAggregateInputType = {
    id?: true
    shop?: true
    orderId?: true
    totalPrice?: true
    currency?: true
    createdAt?: true
  }

  export type OrderEventCountAggregateInputType = {
    id?: true
    shop?: true
    orderId?: true
    totalPrice?: true
    currency?: true
    items?: true
    createdAt?: true
    _all?: true
  }

  export type OrderEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderEvent to aggregate.
     */
    where?: OrderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderEvents
    **/
    _count?: true | OrderEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderEventMaxAggregateInputType
  }

  export type GetOrderEventAggregateType<T extends OrderEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderEvent[P]>
      : GetScalarType<T[P], AggregateOrderEvent[P]>
  }




  export type OrderEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderEventWhereInput
    orderBy?: OrderEventOrderByWithAggregationInput | OrderEventOrderByWithAggregationInput[]
    by: OrderEventScalarFieldEnum[] | OrderEventScalarFieldEnum
    having?: OrderEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderEventCountAggregateInputType | true
    _avg?: OrderEventAvgAggregateInputType
    _sum?: OrderEventSumAggregateInputType
    _min?: OrderEventMinAggregateInputType
    _max?: OrderEventMaxAggregateInputType
  }

  export type OrderEventGroupByOutputType = {
    id: string
    shop: string
    orderId: string
    totalPrice: number
    currency: string
    items: JsonValue
    createdAt: Date
    _count: OrderEventCountAggregateOutputType | null
    _avg: OrderEventAvgAggregateOutputType | null
    _sum: OrderEventSumAggregateOutputType | null
    _min: OrderEventMinAggregateOutputType | null
    _max: OrderEventMaxAggregateOutputType | null
  }

  type GetOrderEventGroupByPayload<T extends OrderEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderEventGroupByOutputType[P]>
            : GetScalarType<T[P], OrderEventGroupByOutputType[P]>
        }
      >
    >


  export type OrderEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    orderId?: boolean
    totalPrice?: boolean
    currency?: boolean
    items?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orderEvent"]>

  export type OrderEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    orderId?: boolean
    totalPrice?: boolean
    currency?: boolean
    items?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orderEvent"]>

  export type OrderEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    orderId?: boolean
    totalPrice?: boolean
    currency?: boolean
    items?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orderEvent"]>

  export type OrderEventSelectScalar = {
    id?: boolean
    shop?: boolean
    orderId?: boolean
    totalPrice?: boolean
    currency?: boolean
    items?: boolean
    createdAt?: boolean
  }

  export type OrderEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "orderId" | "totalPrice" | "currency" | "items" | "createdAt", ExtArgs["result"]["orderEvent"]>

  export type $OrderEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      orderId: string
      totalPrice: number
      currency: string
      items: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["orderEvent"]>
    composites: {}
  }

  type OrderEventGetPayload<S extends boolean | null | undefined | OrderEventDefaultArgs> = $Result.GetResult<Prisma.$OrderEventPayload, S>

  type OrderEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderEventCountAggregateInputType | true
    }

  export interface OrderEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderEvent'], meta: { name: 'OrderEvent' } }
    /**
     * Find zero or one OrderEvent that matches the filter.
     * @param {OrderEventFindUniqueArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderEventFindUniqueArgs>(args: SelectSubset<T, OrderEventFindUniqueArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderEventFindUniqueOrThrowArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindFirstArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderEventFindFirstArgs>(args?: SelectSubset<T, OrderEventFindFirstArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindFirstOrThrowArgs} args - Arguments to find a OrderEvent
     * @example
     * // Get one OrderEvent
     * const orderEvent = await prisma.orderEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderEvents
     * const orderEvents = await prisma.orderEvent.findMany()
     * 
     * // Get first 10 OrderEvents
     * const orderEvents = await prisma.orderEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderEventWithIdOnly = await prisma.orderEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderEventFindManyArgs>(args?: SelectSubset<T, OrderEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderEvent.
     * @param {OrderEventCreateArgs} args - Arguments to create a OrderEvent.
     * @example
     * // Create one OrderEvent
     * const OrderEvent = await prisma.orderEvent.create({
     *   data: {
     *     // ... data to create a OrderEvent
     *   }
     * })
     * 
     */
    create<T extends OrderEventCreateArgs>(args: SelectSubset<T, OrderEventCreateArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderEvents.
     * @param {OrderEventCreateManyArgs} args - Arguments to create many OrderEvents.
     * @example
     * // Create many OrderEvents
     * const orderEvent = await prisma.orderEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderEventCreateManyArgs>(args?: SelectSubset<T, OrderEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderEvents and returns the data saved in the database.
     * @param {OrderEventCreateManyAndReturnArgs} args - Arguments to create many OrderEvents.
     * @example
     * // Create many OrderEvents
     * const orderEvent = await prisma.orderEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderEvents and only return the `id`
     * const orderEventWithIdOnly = await prisma.orderEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderEvent.
     * @param {OrderEventDeleteArgs} args - Arguments to delete one OrderEvent.
     * @example
     * // Delete one OrderEvent
     * const OrderEvent = await prisma.orderEvent.delete({
     *   where: {
     *     // ... filter to delete one OrderEvent
     *   }
     * })
     * 
     */
    delete<T extends OrderEventDeleteArgs>(args: SelectSubset<T, OrderEventDeleteArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderEvent.
     * @param {OrderEventUpdateArgs} args - Arguments to update one OrderEvent.
     * @example
     * // Update one OrderEvent
     * const orderEvent = await prisma.orderEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderEventUpdateArgs>(args: SelectSubset<T, OrderEventUpdateArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderEvents.
     * @param {OrderEventDeleteManyArgs} args - Arguments to filter OrderEvents to delete.
     * @example
     * // Delete a few OrderEvents
     * const { count } = await prisma.orderEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderEventDeleteManyArgs>(args?: SelectSubset<T, OrderEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderEvents
     * const orderEvent = await prisma.orderEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderEventUpdateManyArgs>(args: SelectSubset<T, OrderEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderEvents and returns the data updated in the database.
     * @param {OrderEventUpdateManyAndReturnArgs} args - Arguments to update many OrderEvents.
     * @example
     * // Update many OrderEvents
     * const orderEvent = await prisma.orderEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderEvents and only return the `id`
     * const orderEventWithIdOnly = await prisma.orderEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderEventUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderEvent.
     * @param {OrderEventUpsertArgs} args - Arguments to update or create a OrderEvent.
     * @example
     * // Update or create a OrderEvent
     * const orderEvent = await prisma.orderEvent.upsert({
     *   create: {
     *     // ... data to create a OrderEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderEvent we want to update
     *   }
     * })
     */
    upsert<T extends OrderEventUpsertArgs>(args: SelectSubset<T, OrderEventUpsertArgs<ExtArgs>>): Prisma__OrderEventClient<$Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventCountArgs} args - Arguments to filter OrderEvents to count.
     * @example
     * // Count the number of OrderEvents
     * const count = await prisma.orderEvent.count({
     *   where: {
     *     // ... the filter for the OrderEvents we want to count
     *   }
     * })
    **/
    count<T extends OrderEventCountArgs>(
      args?: Subset<T, OrderEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderEventAggregateArgs>(args: Subset<T, OrderEventAggregateArgs>): Prisma.PrismaPromise<GetOrderEventAggregateType<T>>

    /**
     * Group by OrderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderEventGroupByArgs['orderBy'] }
        : { orderBy?: OrderEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderEvent model
   */
  readonly fields: OrderEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderEvent model
   */
  interface OrderEventFieldRefs {
    readonly id: FieldRef<"OrderEvent", 'String'>
    readonly shop: FieldRef<"OrderEvent", 'String'>
    readonly orderId: FieldRef<"OrderEvent", 'String'>
    readonly totalPrice: FieldRef<"OrderEvent", 'Float'>
    readonly currency: FieldRef<"OrderEvent", 'String'>
    readonly items: FieldRef<"OrderEvent", 'Json'>
    readonly createdAt: FieldRef<"OrderEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderEvent findUnique
   */
  export type OrderEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter, which OrderEvent to fetch.
     */
    where: OrderEventWhereUniqueInput
  }

  /**
   * OrderEvent findUniqueOrThrow
   */
  export type OrderEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter, which OrderEvent to fetch.
     */
    where: OrderEventWhereUniqueInput
  }

  /**
   * OrderEvent findFirst
   */
  export type OrderEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter, which OrderEvent to fetch.
     */
    where?: OrderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderEvents.
     */
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[]
  }

  /**
   * OrderEvent findFirstOrThrow
   */
  export type OrderEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter, which OrderEvent to fetch.
     */
    where?: OrderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderEvents.
     */
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[]
  }

  /**
   * OrderEvent findMany
   */
  export type OrderEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter, which OrderEvents to fetch.
     */
    where?: OrderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEvents to fetch.
     */
    orderBy?: OrderEventOrderByWithRelationInput | OrderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderEvents.
     */
    cursor?: OrderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEvents.
     */
    skip?: number
    distinct?: OrderEventScalarFieldEnum | OrderEventScalarFieldEnum[]
  }

  /**
   * OrderEvent create
   */
  export type OrderEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * The data needed to create a OrderEvent.
     */
    data: XOR<OrderEventCreateInput, OrderEventUncheckedCreateInput>
  }

  /**
   * OrderEvent createMany
   */
  export type OrderEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderEvents.
     */
    data: OrderEventCreateManyInput | OrderEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderEvent createManyAndReturn
   */
  export type OrderEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * The data used to create many OrderEvents.
     */
    data: OrderEventCreateManyInput | OrderEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderEvent update
   */
  export type OrderEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * The data needed to update a OrderEvent.
     */
    data: XOR<OrderEventUpdateInput, OrderEventUncheckedUpdateInput>
    /**
     * Choose, which OrderEvent to update.
     */
    where: OrderEventWhereUniqueInput
  }

  /**
   * OrderEvent updateMany
   */
  export type OrderEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderEvents.
     */
    data: XOR<OrderEventUpdateManyMutationInput, OrderEventUncheckedUpdateManyInput>
    /**
     * Filter which OrderEvents to update
     */
    where?: OrderEventWhereInput
    /**
     * Limit how many OrderEvents to update.
     */
    limit?: number
  }

  /**
   * OrderEvent updateManyAndReturn
   */
  export type OrderEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * The data used to update OrderEvents.
     */
    data: XOR<OrderEventUpdateManyMutationInput, OrderEventUncheckedUpdateManyInput>
    /**
     * Filter which OrderEvents to update
     */
    where?: OrderEventWhereInput
    /**
     * Limit how many OrderEvents to update.
     */
    limit?: number
  }

  /**
   * OrderEvent upsert
   */
  export type OrderEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * The filter to search for the OrderEvent to update in case it exists.
     */
    where: OrderEventWhereUniqueInput
    /**
     * In case the OrderEvent found by the `where` argument doesn't exist, create a new OrderEvent with this data.
     */
    create: XOR<OrderEventCreateInput, OrderEventUncheckedCreateInput>
    /**
     * In case the OrderEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderEventUpdateInput, OrderEventUncheckedUpdateInput>
  }

  /**
   * OrderEvent delete
   */
  export type OrderEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
    /**
     * Filter which OrderEvent to delete.
     */
    where: OrderEventWhereUniqueInput
  }

  /**
   * OrderEvent deleteMany
   */
  export type OrderEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderEvents to delete
     */
    where?: OrderEventWhereInput
    /**
     * Limit how many OrderEvents to delete.
     */
    limit?: number
  }

  /**
   * OrderEvent without action
   */
  export type OrderEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEvent
     */
    select?: OrderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEvent
     */
    omit?: OrderEventOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    state: 'state',
    isOnline: 'isOnline',
    scope: 'scope',
    expires: 'expires',
    accessToken: 'accessToken',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    accountOwner: 'accountOwner',
    locale: 'locale',
    collaborator: 'collaborator',
    emailVerified: 'emailVerified',
    refreshToken: 'refreshToken',
    refreshTokenExpires: 'refreshTokenExpires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ShopSubscriptionScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    planName: 'planName',
    orderLimit: 'orderLimit',
    orderCount: 'orderCount',
    trialEndsAt: 'trialEndsAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopSubscriptionScalarFieldEnum = (typeof ShopSubscriptionScalarFieldEnum)[keyof typeof ShopSubscriptionScalarFieldEnum]


  export const CartSettingsScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    backgroundColor: 'backgroundColor',
    buttonColor: 'buttonColor',
    buttonTextKey: 'buttonTextKey',
    enableTimer: 'enableTimer',
    timerMinutes: 'timerMinutes',
    enableFreeShippingBar: 'enableFreeShippingBar',
    freeShippingThreshold: 'freeShippingThreshold',
    enableGiftWrap: 'enableGiftWrap',
    giftWrapPrice: 'giftWrapPrice',
    enableUpsell: 'enableUpsell',
    upsellProductIds: 'upsellProductIds',
    enableDynamicDiscounts: 'enableDynamicDiscounts',
    discountRules: 'discountRules',
    modules: 'modules',
    moduleOrder: 'moduleOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartSettingsScalarFieldEnum = (typeof CartSettingsScalarFieldEnum)[keyof typeof CartSettingsScalarFieldEnum]


  export const CartEventScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    cartId: 'cartId',
    eventType: 'eventType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartEventScalarFieldEnum = (typeof CartEventScalarFieldEnum)[keyof typeof CartEventScalarFieldEnum]


  export const UpsellEventScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    productId: 'productId',
    productTitle: 'productTitle',
    variantId: 'variantId',
    eventType: 'eventType',
    orderId: 'orderId',
    createdAt: 'createdAt'
  };

  export type UpsellEventScalarFieldEnum = (typeof UpsellEventScalarFieldEnum)[keyof typeof UpsellEventScalarFieldEnum]


  export const OrderEventScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    orderId: 'orderId',
    totalPrice: 'totalPrice',
    currency: 'currency',
    items: 'items',
    createdAt: 'createdAt'
  };

  export type OrderEventScalarFieldEnum = (typeof OrderEventScalarFieldEnum)[keyof typeof OrderEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
    refreshToken?: StringNullableFilter<"Session"> | string | null
    refreshTokenExpires?: DateTimeNullableFilter<"Session"> | Date | string | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    refreshTokenExpires?: SortOrderInput | SortOrder
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
    refreshToken?: StringNullableFilter<"Session"> | string | null
    refreshTokenExpires?: DateTimeNullableFilter<"Session"> | Date | string | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    refreshTokenExpires?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    shop?: StringWithAggregatesFilter<"Session"> | string
    state?: StringWithAggregatesFilter<"Session"> | string
    isOnline?: BoolWithAggregatesFilter<"Session"> | boolean
    scope?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expires?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    accessToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: BigIntNullableWithAggregatesFilter<"Session"> | bigint | number | null
    firstName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    email?: StringNullableWithAggregatesFilter<"Session"> | string | null
    accountOwner?: BoolWithAggregatesFilter<"Session"> | boolean
    locale?: StringNullableWithAggregatesFilter<"Session"> | string | null
    collaborator?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    refreshToken?: StringNullableWithAggregatesFilter<"Session"> | string | null
    refreshTokenExpires?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
  }

  export type ShopSubscriptionWhereInput = {
    AND?: ShopSubscriptionWhereInput | ShopSubscriptionWhereInput[]
    OR?: ShopSubscriptionWhereInput[]
    NOT?: ShopSubscriptionWhereInput | ShopSubscriptionWhereInput[]
    id?: StringFilter<"ShopSubscription"> | string
    shop?: StringFilter<"ShopSubscription"> | string
    planName?: StringFilter<"ShopSubscription"> | string
    orderLimit?: IntFilter<"ShopSubscription"> | number
    orderCount?: IntFilter<"ShopSubscription"> | number
    trialEndsAt?: DateTimeNullableFilter<"ShopSubscription"> | Date | string | null
    isActive?: BoolFilter<"ShopSubscription"> | boolean
    createdAt?: DateTimeFilter<"ShopSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"ShopSubscription"> | Date | string
    settings?: XOR<CartSettingsNullableScalarRelationFilter, CartSettingsWhereInput> | null
  }

  export type ShopSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    planName?: SortOrder
    orderLimit?: SortOrder
    orderCount?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settings?: CartSettingsOrderByWithRelationInput
  }

  export type ShopSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shop?: string
    AND?: ShopSubscriptionWhereInput | ShopSubscriptionWhereInput[]
    OR?: ShopSubscriptionWhereInput[]
    NOT?: ShopSubscriptionWhereInput | ShopSubscriptionWhereInput[]
    planName?: StringFilter<"ShopSubscription"> | string
    orderLimit?: IntFilter<"ShopSubscription"> | number
    orderCount?: IntFilter<"ShopSubscription"> | number
    trialEndsAt?: DateTimeNullableFilter<"ShopSubscription"> | Date | string | null
    isActive?: BoolFilter<"ShopSubscription"> | boolean
    createdAt?: DateTimeFilter<"ShopSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"ShopSubscription"> | Date | string
    settings?: XOR<CartSettingsNullableScalarRelationFilter, CartSettingsWhereInput> | null
  }, "id" | "shop">

  export type ShopSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    planName?: SortOrder
    orderLimit?: SortOrder
    orderCount?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopSubscriptionCountOrderByAggregateInput
    _avg?: ShopSubscriptionAvgOrderByAggregateInput
    _max?: ShopSubscriptionMaxOrderByAggregateInput
    _min?: ShopSubscriptionMinOrderByAggregateInput
    _sum?: ShopSubscriptionSumOrderByAggregateInput
  }

  export type ShopSubscriptionScalarWhereWithAggregatesInput = {
    AND?: ShopSubscriptionScalarWhereWithAggregatesInput | ShopSubscriptionScalarWhereWithAggregatesInput[]
    OR?: ShopSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: ShopSubscriptionScalarWhereWithAggregatesInput | ShopSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopSubscription"> | string
    shop?: StringWithAggregatesFilter<"ShopSubscription"> | string
    planName?: StringWithAggregatesFilter<"ShopSubscription"> | string
    orderLimit?: IntWithAggregatesFilter<"ShopSubscription"> | number
    orderCount?: IntWithAggregatesFilter<"ShopSubscription"> | number
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"ShopSubscription"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"ShopSubscription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ShopSubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopSubscription"> | Date | string
  }

  export type CartSettingsWhereInput = {
    AND?: CartSettingsWhereInput | CartSettingsWhereInput[]
    OR?: CartSettingsWhereInput[]
    NOT?: CartSettingsWhereInput | CartSettingsWhereInput[]
    id?: StringFilter<"CartSettings"> | string
    shop?: StringFilter<"CartSettings"> | string
    backgroundColor?: StringFilter<"CartSettings"> | string
    buttonColor?: StringFilter<"CartSettings"> | string
    buttonTextKey?: StringFilter<"CartSettings"> | string
    enableTimer?: BoolFilter<"CartSettings"> | boolean
    timerMinutes?: IntFilter<"CartSettings"> | number
    enableFreeShippingBar?: BoolFilter<"CartSettings"> | boolean
    freeShippingThreshold?: FloatFilter<"CartSettings"> | number
    enableGiftWrap?: BoolFilter<"CartSettings"> | boolean
    giftWrapPrice?: FloatFilter<"CartSettings"> | number
    enableUpsell?: BoolFilter<"CartSettings"> | boolean
    upsellProductIds?: JsonFilter<"CartSettings">
    enableDynamicDiscounts?: BoolFilter<"CartSettings"> | boolean
    discountRules?: JsonFilter<"CartSettings">
    modules?: JsonFilter<"CartSettings">
    moduleOrder?: JsonFilter<"CartSettings">
    createdAt?: DateTimeFilter<"CartSettings"> | Date | string
    updatedAt?: DateTimeFilter<"CartSettings"> | Date | string
    subscription?: XOR<ShopSubscriptionScalarRelationFilter, ShopSubscriptionWhereInput>
  }

  export type CartSettingsOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    backgroundColor?: SortOrder
    buttonColor?: SortOrder
    buttonTextKey?: SortOrder
    enableTimer?: SortOrder
    timerMinutes?: SortOrder
    enableFreeShippingBar?: SortOrder
    freeShippingThreshold?: SortOrder
    enableGiftWrap?: SortOrder
    giftWrapPrice?: SortOrder
    enableUpsell?: SortOrder
    upsellProductIds?: SortOrder
    enableDynamicDiscounts?: SortOrder
    discountRules?: SortOrder
    modules?: SortOrder
    moduleOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: ShopSubscriptionOrderByWithRelationInput
  }

  export type CartSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shop?: string
    AND?: CartSettingsWhereInput | CartSettingsWhereInput[]
    OR?: CartSettingsWhereInput[]
    NOT?: CartSettingsWhereInput | CartSettingsWhereInput[]
    backgroundColor?: StringFilter<"CartSettings"> | string
    buttonColor?: StringFilter<"CartSettings"> | string
    buttonTextKey?: StringFilter<"CartSettings"> | string
    enableTimer?: BoolFilter<"CartSettings"> | boolean
    timerMinutes?: IntFilter<"CartSettings"> | number
    enableFreeShippingBar?: BoolFilter<"CartSettings"> | boolean
    freeShippingThreshold?: FloatFilter<"CartSettings"> | number
    enableGiftWrap?: BoolFilter<"CartSettings"> | boolean
    giftWrapPrice?: FloatFilter<"CartSettings"> | number
    enableUpsell?: BoolFilter<"CartSettings"> | boolean
    upsellProductIds?: JsonFilter<"CartSettings">
    enableDynamicDiscounts?: BoolFilter<"CartSettings"> | boolean
    discountRules?: JsonFilter<"CartSettings">
    modules?: JsonFilter<"CartSettings">
    moduleOrder?: JsonFilter<"CartSettings">
    createdAt?: DateTimeFilter<"CartSettings"> | Date | string
    updatedAt?: DateTimeFilter<"CartSettings"> | Date | string
    subscription?: XOR<ShopSubscriptionScalarRelationFilter, ShopSubscriptionWhereInput>
  }, "id" | "shop">

  export type CartSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    backgroundColor?: SortOrder
    buttonColor?: SortOrder
    buttonTextKey?: SortOrder
    enableTimer?: SortOrder
    timerMinutes?: SortOrder
    enableFreeShippingBar?: SortOrder
    freeShippingThreshold?: SortOrder
    enableGiftWrap?: SortOrder
    giftWrapPrice?: SortOrder
    enableUpsell?: SortOrder
    upsellProductIds?: SortOrder
    enableDynamicDiscounts?: SortOrder
    discountRules?: SortOrder
    modules?: SortOrder
    moduleOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartSettingsCountOrderByAggregateInput
    _avg?: CartSettingsAvgOrderByAggregateInput
    _max?: CartSettingsMaxOrderByAggregateInput
    _min?: CartSettingsMinOrderByAggregateInput
    _sum?: CartSettingsSumOrderByAggregateInput
  }

  export type CartSettingsScalarWhereWithAggregatesInput = {
    AND?: CartSettingsScalarWhereWithAggregatesInput | CartSettingsScalarWhereWithAggregatesInput[]
    OR?: CartSettingsScalarWhereWithAggregatesInput[]
    NOT?: CartSettingsScalarWhereWithAggregatesInput | CartSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartSettings"> | string
    shop?: StringWithAggregatesFilter<"CartSettings"> | string
    backgroundColor?: StringWithAggregatesFilter<"CartSettings"> | string
    buttonColor?: StringWithAggregatesFilter<"CartSettings"> | string
    buttonTextKey?: StringWithAggregatesFilter<"CartSettings"> | string
    enableTimer?: BoolWithAggregatesFilter<"CartSettings"> | boolean
    timerMinutes?: IntWithAggregatesFilter<"CartSettings"> | number
    enableFreeShippingBar?: BoolWithAggregatesFilter<"CartSettings"> | boolean
    freeShippingThreshold?: FloatWithAggregatesFilter<"CartSettings"> | number
    enableGiftWrap?: BoolWithAggregatesFilter<"CartSettings"> | boolean
    giftWrapPrice?: FloatWithAggregatesFilter<"CartSettings"> | number
    enableUpsell?: BoolWithAggregatesFilter<"CartSettings"> | boolean
    upsellProductIds?: JsonWithAggregatesFilter<"CartSettings">
    enableDynamicDiscounts?: BoolWithAggregatesFilter<"CartSettings"> | boolean
    discountRules?: JsonWithAggregatesFilter<"CartSettings">
    modules?: JsonWithAggregatesFilter<"CartSettings">
    moduleOrder?: JsonWithAggregatesFilter<"CartSettings">
    createdAt?: DateTimeWithAggregatesFilter<"CartSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CartSettings"> | Date | string
  }

  export type CartEventWhereInput = {
    AND?: CartEventWhereInput | CartEventWhereInput[]
    OR?: CartEventWhereInput[]
    NOT?: CartEventWhereInput | CartEventWhereInput[]
    id?: StringFilter<"CartEvent"> | string
    shop?: StringFilter<"CartEvent"> | string
    cartId?: StringFilter<"CartEvent"> | string
    eventType?: StringFilter<"CartEvent"> | string
    createdAt?: DateTimeFilter<"CartEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CartEvent"> | Date | string
  }

  export type CartEventOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    cartId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartEventWhereInput | CartEventWhereInput[]
    OR?: CartEventWhereInput[]
    NOT?: CartEventWhereInput | CartEventWhereInput[]
    shop?: StringFilter<"CartEvent"> | string
    cartId?: StringFilter<"CartEvent"> | string
    eventType?: StringFilter<"CartEvent"> | string
    createdAt?: DateTimeFilter<"CartEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CartEvent"> | Date | string
  }, "id">

  export type CartEventOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    cartId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartEventCountOrderByAggregateInput
    _max?: CartEventMaxOrderByAggregateInput
    _min?: CartEventMinOrderByAggregateInput
  }

  export type CartEventScalarWhereWithAggregatesInput = {
    AND?: CartEventScalarWhereWithAggregatesInput | CartEventScalarWhereWithAggregatesInput[]
    OR?: CartEventScalarWhereWithAggregatesInput[]
    NOT?: CartEventScalarWhereWithAggregatesInput | CartEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartEvent"> | string
    shop?: StringWithAggregatesFilter<"CartEvent"> | string
    cartId?: StringWithAggregatesFilter<"CartEvent"> | string
    eventType?: StringWithAggregatesFilter<"CartEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CartEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CartEvent"> | Date | string
  }

  export type UpsellEventWhereInput = {
    AND?: UpsellEventWhereInput | UpsellEventWhereInput[]
    OR?: UpsellEventWhereInput[]
    NOT?: UpsellEventWhereInput | UpsellEventWhereInput[]
    id?: StringFilter<"UpsellEvent"> | string
    shop?: StringFilter<"UpsellEvent"> | string
    productId?: StringFilter<"UpsellEvent"> | string
    productTitle?: StringFilter<"UpsellEvent"> | string
    variantId?: StringFilter<"UpsellEvent"> | string
    eventType?: StringFilter<"UpsellEvent"> | string
    orderId?: StringNullableFilter<"UpsellEvent"> | string | null
    createdAt?: DateTimeFilter<"UpsellEvent"> | Date | string
  }

  export type UpsellEventOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantId?: SortOrder
    eventType?: SortOrder
    orderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type UpsellEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UpsellEventWhereInput | UpsellEventWhereInput[]
    OR?: UpsellEventWhereInput[]
    NOT?: UpsellEventWhereInput | UpsellEventWhereInput[]
    shop?: StringFilter<"UpsellEvent"> | string
    productId?: StringFilter<"UpsellEvent"> | string
    productTitle?: StringFilter<"UpsellEvent"> | string
    variantId?: StringFilter<"UpsellEvent"> | string
    eventType?: StringFilter<"UpsellEvent"> | string
    orderId?: StringNullableFilter<"UpsellEvent"> | string | null
    createdAt?: DateTimeFilter<"UpsellEvent"> | Date | string
  }, "id">

  export type UpsellEventOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantId?: SortOrder
    eventType?: SortOrder
    orderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UpsellEventCountOrderByAggregateInput
    _max?: UpsellEventMaxOrderByAggregateInput
    _min?: UpsellEventMinOrderByAggregateInput
  }

  export type UpsellEventScalarWhereWithAggregatesInput = {
    AND?: UpsellEventScalarWhereWithAggregatesInput | UpsellEventScalarWhereWithAggregatesInput[]
    OR?: UpsellEventScalarWhereWithAggregatesInput[]
    NOT?: UpsellEventScalarWhereWithAggregatesInput | UpsellEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UpsellEvent"> | string
    shop?: StringWithAggregatesFilter<"UpsellEvent"> | string
    productId?: StringWithAggregatesFilter<"UpsellEvent"> | string
    productTitle?: StringWithAggregatesFilter<"UpsellEvent"> | string
    variantId?: StringWithAggregatesFilter<"UpsellEvent"> | string
    eventType?: StringWithAggregatesFilter<"UpsellEvent"> | string
    orderId?: StringNullableWithAggregatesFilter<"UpsellEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UpsellEvent"> | Date | string
  }

  export type OrderEventWhereInput = {
    AND?: OrderEventWhereInput | OrderEventWhereInput[]
    OR?: OrderEventWhereInput[]
    NOT?: OrderEventWhereInput | OrderEventWhereInput[]
    id?: StringFilter<"OrderEvent"> | string
    shop?: StringFilter<"OrderEvent"> | string
    orderId?: StringFilter<"OrderEvent"> | string
    totalPrice?: FloatFilter<"OrderEvent"> | number
    currency?: StringFilter<"OrderEvent"> | string
    items?: JsonFilter<"OrderEvent">
    createdAt?: DateTimeFilter<"OrderEvent"> | Date | string
  }

  export type OrderEventOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    orderId?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    items?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderEventWhereInput | OrderEventWhereInput[]
    OR?: OrderEventWhereInput[]
    NOT?: OrderEventWhereInput | OrderEventWhereInput[]
    shop?: StringFilter<"OrderEvent"> | string
    orderId?: StringFilter<"OrderEvent"> | string
    totalPrice?: FloatFilter<"OrderEvent"> | number
    currency?: StringFilter<"OrderEvent"> | string
    items?: JsonFilter<"OrderEvent">
    createdAt?: DateTimeFilter<"OrderEvent"> | Date | string
  }, "id">

  export type OrderEventOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    orderId?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    items?: SortOrder
    createdAt?: SortOrder
    _count?: OrderEventCountOrderByAggregateInput
    _avg?: OrderEventAvgOrderByAggregateInput
    _max?: OrderEventMaxOrderByAggregateInput
    _min?: OrderEventMinOrderByAggregateInput
    _sum?: OrderEventSumOrderByAggregateInput
  }

  export type OrderEventScalarWhereWithAggregatesInput = {
    AND?: OrderEventScalarWhereWithAggregatesInput | OrderEventScalarWhereWithAggregatesInput[]
    OR?: OrderEventScalarWhereWithAggregatesInput[]
    NOT?: OrderEventScalarWhereWithAggregatesInput | OrderEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderEvent"> | string
    shop?: StringWithAggregatesFilter<"OrderEvent"> | string
    orderId?: StringWithAggregatesFilter<"OrderEvent"> | string
    totalPrice?: FloatWithAggregatesFilter<"OrderEvent"> | number
    currency?: StringWithAggregatesFilter<"OrderEvent"> | string
    items?: JsonWithAggregatesFilter<"OrderEvent">
    createdAt?: DateTimeWithAggregatesFilter<"OrderEvent"> | Date | string
  }

  export type SessionCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type SessionUncheckedCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ShopSubscriptionCreateInput = {
    id?: string
    shop: string
    planName?: string
    orderLimit?: number
    orderCount?: number
    trialEndsAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: CartSettingsCreateNestedOneWithoutSubscriptionInput
  }

  export type ShopSubscriptionUncheckedCreateInput = {
    id?: string
    shop: string
    planName?: string
    orderLimit?: number
    orderCount?: number
    trialEndsAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: CartSettingsUncheckedCreateNestedOneWithoutSubscriptionInput
  }

  export type ShopSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: CartSettingsUpdateOneWithoutSubscriptionNestedInput
  }

  export type ShopSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: CartSettingsUncheckedUpdateOneWithoutSubscriptionNestedInput
  }

  export type ShopSubscriptionCreateManyInput = {
    id?: string
    shop: string
    planName?: string
    orderLimit?: number
    orderCount?: number
    trialEndsAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartSettingsCreateInput = {
    id?: string
    backgroundColor?: string
    buttonColor?: string
    buttonTextKey?: string
    enableTimer?: boolean
    timerMinutes?: number
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: number
    enableGiftWrap?: boolean
    giftWrapPrice?: number
    enableUpsell?: boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: ShopSubscriptionCreateNestedOneWithoutSettingsInput
  }

  export type CartSettingsUncheckedCreateInput = {
    id?: string
    shop: string
    backgroundColor?: string
    buttonColor?: string
    buttonTextKey?: string
    enableTimer?: boolean
    timerMinutes?: number
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: number
    enableGiftWrap?: boolean
    giftWrapPrice?: number
    enableUpsell?: boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: ShopSubscriptionUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type CartSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartSettingsCreateManyInput = {
    id?: string
    shop: string
    backgroundColor?: string
    buttonColor?: string
    buttonTextKey?: string
    enableTimer?: boolean
    timerMinutes?: number
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: number
    enableGiftWrap?: boolean
    giftWrapPrice?: number
    enableUpsell?: boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartEventCreateInput = {
    id?: string
    shop: string
    cartId: string
    eventType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartEventUncheckedCreateInput = {
    id?: string
    shop: string
    cartId: string
    eventType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartEventCreateManyInput = {
    id?: string
    shop: string
    cartId: string
    eventType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpsellEventCreateInput = {
    id?: string
    shop: string
    productId: string
    productTitle: string
    variantId: string
    eventType: string
    orderId?: string | null
    createdAt?: Date | string
  }

  export type UpsellEventUncheckedCreateInput = {
    id?: string
    shop: string
    productId: string
    productTitle: string
    variantId: string
    eventType: string
    orderId?: string | null
    createdAt?: Date | string
  }

  export type UpsellEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpsellEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpsellEventCreateManyInput = {
    id?: string
    shop: string
    productId: string
    productTitle: string
    variantId: string
    eventType: string
    orderId?: string | null
    createdAt?: Date | string
  }

  export type UpsellEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpsellEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEventCreateInput = {
    id?: string
    shop: string
    orderId: string
    totalPrice: number
    currency: string
    items: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderEventUncheckedCreateInput = {
    id?: string
    shop: string
    orderId: string
    totalPrice: number
    currency: string
    items: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    totalPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    totalPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEventCreateManyInput = {
    id?: string
    shop: string
    orderId: string
    totalPrice: number
    currency: string
    items: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    totalPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    totalPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CartSettingsNullableScalarRelationFilter = {
    is?: CartSettingsWhereInput | null
    isNot?: CartSettingsWhereInput | null
  }

  export type ShopSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    planName?: SortOrder
    orderLimit?: SortOrder
    orderCount?: SortOrder
    trialEndsAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopSubscriptionAvgOrderByAggregateInput = {
    orderLimit?: SortOrder
    orderCount?: SortOrder
  }

  export type ShopSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    planName?: SortOrder
    orderLimit?: SortOrder
    orderCount?: SortOrder
    trialEndsAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    planName?: SortOrder
    orderLimit?: SortOrder
    orderCount?: SortOrder
    trialEndsAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopSubscriptionSumOrderByAggregateInput = {
    orderLimit?: SortOrder
    orderCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ShopSubscriptionScalarRelationFilter = {
    is?: ShopSubscriptionWhereInput
    isNot?: ShopSubscriptionWhereInput
  }

  export type CartSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    backgroundColor?: SortOrder
    buttonColor?: SortOrder
    buttonTextKey?: SortOrder
    enableTimer?: SortOrder
    timerMinutes?: SortOrder
    enableFreeShippingBar?: SortOrder
    freeShippingThreshold?: SortOrder
    enableGiftWrap?: SortOrder
    giftWrapPrice?: SortOrder
    enableUpsell?: SortOrder
    upsellProductIds?: SortOrder
    enableDynamicDiscounts?: SortOrder
    discountRules?: SortOrder
    modules?: SortOrder
    moduleOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSettingsAvgOrderByAggregateInput = {
    timerMinutes?: SortOrder
    freeShippingThreshold?: SortOrder
    giftWrapPrice?: SortOrder
  }

  export type CartSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    backgroundColor?: SortOrder
    buttonColor?: SortOrder
    buttonTextKey?: SortOrder
    enableTimer?: SortOrder
    timerMinutes?: SortOrder
    enableFreeShippingBar?: SortOrder
    freeShippingThreshold?: SortOrder
    enableGiftWrap?: SortOrder
    giftWrapPrice?: SortOrder
    enableUpsell?: SortOrder
    enableDynamicDiscounts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    backgroundColor?: SortOrder
    buttonColor?: SortOrder
    buttonTextKey?: SortOrder
    enableTimer?: SortOrder
    timerMinutes?: SortOrder
    enableFreeShippingBar?: SortOrder
    freeShippingThreshold?: SortOrder
    enableGiftWrap?: SortOrder
    giftWrapPrice?: SortOrder
    enableUpsell?: SortOrder
    enableDynamicDiscounts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSettingsSumOrderByAggregateInput = {
    timerMinutes?: SortOrder
    freeShippingThreshold?: SortOrder
    giftWrapPrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CartEventCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    cartId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartEventMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    cartId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartEventMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    cartId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UpsellEventCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantId?: SortOrder
    eventType?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
  }

  export type UpsellEventMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantId?: SortOrder
    eventType?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
  }

  export type UpsellEventMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantId?: SortOrder
    eventType?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderEventCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    orderId?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    items?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderEventAvgOrderByAggregateInput = {
    totalPrice?: SortOrder
  }

  export type OrderEventMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    orderId?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderEventMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    orderId?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderEventSumOrderByAggregateInput = {
    totalPrice?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type CartSettingsCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CartSettingsCreateOrConnectWithoutSubscriptionInput
    connect?: CartSettingsWhereUniqueInput
  }

  export type CartSettingsUncheckedCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CartSettingsCreateOrConnectWithoutSubscriptionInput
    connect?: CartSettingsWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CartSettingsUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CartSettingsCreateOrConnectWithoutSubscriptionInput
    upsert?: CartSettingsUpsertWithoutSubscriptionInput
    disconnect?: CartSettingsWhereInput | boolean
    delete?: CartSettingsWhereInput | boolean
    connect?: CartSettingsWhereUniqueInput
    update?: XOR<XOR<CartSettingsUpdateToOneWithWhereWithoutSubscriptionInput, CartSettingsUpdateWithoutSubscriptionInput>, CartSettingsUncheckedUpdateWithoutSubscriptionInput>
  }

  export type CartSettingsUncheckedUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CartSettingsCreateOrConnectWithoutSubscriptionInput
    upsert?: CartSettingsUpsertWithoutSubscriptionInput
    disconnect?: CartSettingsWhereInput | boolean
    delete?: CartSettingsWhereInput | boolean
    connect?: CartSettingsWhereUniqueInput
    update?: XOR<XOR<CartSettingsUpdateToOneWithWhereWithoutSubscriptionInput, CartSettingsUpdateWithoutSubscriptionInput>, CartSettingsUncheckedUpdateWithoutSubscriptionInput>
  }

  export type ShopSubscriptionCreateNestedOneWithoutSettingsInput = {
    create?: XOR<ShopSubscriptionCreateWithoutSettingsInput, ShopSubscriptionUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ShopSubscriptionCreateOrConnectWithoutSettingsInput
    connect?: ShopSubscriptionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShopSubscriptionUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<ShopSubscriptionCreateWithoutSettingsInput, ShopSubscriptionUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ShopSubscriptionCreateOrConnectWithoutSettingsInput
    upsert?: ShopSubscriptionUpsertWithoutSettingsInput
    connect?: ShopSubscriptionWhereUniqueInput
    update?: XOR<XOR<ShopSubscriptionUpdateToOneWithWhereWithoutSettingsInput, ShopSubscriptionUpdateWithoutSettingsInput>, ShopSubscriptionUncheckedUpdateWithoutSettingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CartSettingsCreateWithoutSubscriptionInput = {
    id?: string
    backgroundColor?: string
    buttonColor?: string
    buttonTextKey?: string
    enableTimer?: boolean
    timerMinutes?: number
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: number
    enableGiftWrap?: boolean
    giftWrapPrice?: number
    enableUpsell?: boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartSettingsUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    backgroundColor?: string
    buttonColor?: string
    buttonTextKey?: string
    enableTimer?: boolean
    timerMinutes?: number
    enableFreeShippingBar?: boolean
    freeShippingThreshold?: number
    enableGiftWrap?: boolean
    giftWrapPrice?: number
    enableUpsell?: boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartSettingsCreateOrConnectWithoutSubscriptionInput = {
    where: CartSettingsWhereUniqueInput
    create: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
  }

  export type CartSettingsUpsertWithoutSubscriptionInput = {
    update: XOR<CartSettingsUpdateWithoutSubscriptionInput, CartSettingsUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<CartSettingsCreateWithoutSubscriptionInput, CartSettingsUncheckedCreateWithoutSubscriptionInput>
    where?: CartSettingsWhereInput
  }

  export type CartSettingsUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: CartSettingsWhereInput
    data: XOR<CartSettingsUpdateWithoutSubscriptionInput, CartSettingsUncheckedUpdateWithoutSubscriptionInput>
  }

  export type CartSettingsUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartSettingsUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    buttonColor?: StringFieldUpdateOperationsInput | string
    buttonTextKey?: StringFieldUpdateOperationsInput | string
    enableTimer?: BoolFieldUpdateOperationsInput | boolean
    timerMinutes?: IntFieldUpdateOperationsInput | number
    enableFreeShippingBar?: BoolFieldUpdateOperationsInput | boolean
    freeShippingThreshold?: FloatFieldUpdateOperationsInput | number
    enableGiftWrap?: BoolFieldUpdateOperationsInput | boolean
    giftWrapPrice?: FloatFieldUpdateOperationsInput | number
    enableUpsell?: BoolFieldUpdateOperationsInput | boolean
    upsellProductIds?: JsonNullValueInput | InputJsonValue
    enableDynamicDiscounts?: BoolFieldUpdateOperationsInput | boolean
    discountRules?: JsonNullValueInput | InputJsonValue
    modules?: JsonNullValueInput | InputJsonValue
    moduleOrder?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopSubscriptionCreateWithoutSettingsInput = {
    id?: string
    shop: string
    planName?: string
    orderLimit?: number
    orderCount?: number
    trialEndsAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopSubscriptionUncheckedCreateWithoutSettingsInput = {
    id?: string
    shop: string
    planName?: string
    orderLimit?: number
    orderCount?: number
    trialEndsAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopSubscriptionCreateOrConnectWithoutSettingsInput = {
    where: ShopSubscriptionWhereUniqueInput
    create: XOR<ShopSubscriptionCreateWithoutSettingsInput, ShopSubscriptionUncheckedCreateWithoutSettingsInput>
  }

  export type ShopSubscriptionUpsertWithoutSettingsInput = {
    update: XOR<ShopSubscriptionUpdateWithoutSettingsInput, ShopSubscriptionUncheckedUpdateWithoutSettingsInput>
    create: XOR<ShopSubscriptionCreateWithoutSettingsInput, ShopSubscriptionUncheckedCreateWithoutSettingsInput>
    where?: ShopSubscriptionWhereInput
  }

  export type ShopSubscriptionUpdateToOneWithWhereWithoutSettingsInput = {
    where?: ShopSubscriptionWhereInput
    data: XOR<ShopSubscriptionUpdateWithoutSettingsInput, ShopSubscriptionUncheckedUpdateWithoutSettingsInput>
  }

  export type ShopSubscriptionUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopSubscriptionUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    orderLimit?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}