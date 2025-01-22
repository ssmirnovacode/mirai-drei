import * as React from 'react'
import { ConeGeometry, Mesh, SphereGeometry } from 'three'
import { ForwardRefComponent } from '../helpers/ts-utils'

export type Args<T> = T extends new (...args: any) => any ? ConstructorParameters<T> : T
export type ShapeProps<T> = Omit<JSX.IntrinsicElements['mesh'], 'args'> & { args?: Args<T> }

function create<T>(type: string, effect?: (mesh: Mesh) => void): ForwardRefComponent<ShapeProps<T>, Mesh> {
  const El: any = type + 'Geometry'
  return React.forwardRef(({ args, children, ...props }: ShapeProps<T>, fref: React.ForwardedRef<Mesh>) => {
    const ref = React.useRef<Mesh>(null!)
    React.useImperativeHandle(fref, () => ref.current)
    React.useLayoutEffect(() => void effect?.(ref.current))
    return (
      <mesh ref={ref} {...props}>
        <El attach="geometry" args={args} />
        {children}
      </mesh>
    )
  })
}
// @TODO depure

export const Cone = /* @__PURE__ */ create<typeof ConeGeometry>('cone') // @keep

export const Sphere = /* @__PURE__ */ create<typeof SphereGeometry>('sphere') // @keep
