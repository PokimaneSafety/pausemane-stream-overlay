export class HttpConstants {
    public static readonly MINIMUM_LOGICAL_PORT = 0;

    /* Used by system processes that provide widely used types of network services. */
    public static readonly MINIMUM_SYSTEM_PORT = 0;
    public static readonly MAXIMUM_SYSTEM_PORT = 2 ** 10 - 1;

    /* Used by user services, safe to listen to. */
    public static readonly MINIMUM_REGISTERED_PORT = 2 ** 10;
    public static readonly MAXIMUM_REGISTERED_PORT = 49151;

    /* Used by clients like NAT for short-lived connections, not for services. */
    public static readonly MINIMUM_EPHEMERAL_PORT = 49152;
    public static readonly MAXIMUM_EPHEMERAL_PORT = 2 ** 16 - 1;

    public static readonly MAXIMUM_LOGICAL_PORT = 2 ** 16 - 1;
}
