import { pipe } from "fp-ts/lib/function"
import { collect } from "fp-ts/lib/ReadonlyRecord"
import { Ord } from "fp-ts/lib/string"
import React, { Fragment } from "react"
import { proxy, useSnapshot } from "valtio"

type HouseT = {
  id: string
  position: [number, number]
}

const store = proxy<{
  houses: {
    [key: string]: HouseT
  }
}>({
  houses: {
    foo: {
      id: "foo",
      position: [0, 0],
    },
  },
})

type HouseViewProps = {
  house: Readonly<HouseT>
}

const HouseView = (props: HouseViewProps) => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

function App() {
  const { houses } = useSnapshot(store)

  return (
    <Fragment>
      {pipe(
        houses,
        collect(Ord)((id, house) => (
          <div key={id}>
            <HouseView key={house.id} house={house} />
          </div>
        ))
      )}
    </Fragment>
  )
}

export default App
