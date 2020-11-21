export type StateSetter<S> = (preState: S) => S
export type InitialStateSetter<S> = () => S

export type InitialHookState<S> = S | InitialStateSetter<S>
export type HookState<S> = S | StateSetter<S>
export type ResolvableHookState<S> = S | StateSetter<S> | InitialStateSetter<S>

export function resolveHookState<S>(newState: InitialStateSetter<S>): S
export function resolveHookState<S, C extends S>(newState: StateSetter<S>, currentState: C): S
export function resolveHookState<S, C extends S>(newState: ResolvableHookState<S>, currentState?: C): S
export function resolveHookState<S, C extends S>(newState: ResolvableHookState<S>, currentState?: C): S {
  if (typeof newState === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (newState as Function)(currentState)
  }

  return newState
}
