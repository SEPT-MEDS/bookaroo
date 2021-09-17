import React, { useRef, useState, useEffect } from 'react'

import { Container, StyledInput } from './ISBNFieldStyle'

const KEYS = [0, 1, 2, 3, 4]
const LENGTHS = [3, 1, 2, 6, 1]

const ISBNField = ({ name = 'isbn', onChange, isShortISBN = false }) => {
  const segmentRefs = KEYS.map(() => useRef())
  const [segments, setSegments] = useState(
    Object.fromEntries(KEYS.map(k => [k, '']))
  )

  const updateSegment = (value, i) =>
    setSegments({...segments, [i]: value.replace(/[^0-9]/g, '')})

  const onSegmentChange = (value, i) => {
    if (value.length > LENGTHS[i]) {
      if (i < KEYS.length - 1) {
        segmentRefs[i+1].current.focus()
        updateSegment(value.slice(-1), i+1)
      }
    } else {
      updateSegment(value, i)
    }
  }

  useEffect(() => {
    onChange(KEYS.map(i => segments[i] || '').join(''))
  }, [segments])

  return (
    <Container>
      <label>ISBN</label>
      <div>
        {KEYS.filter((_, i) => isShortISBN ? i > 0 : true).map(i => (
          <span key={i}>
            <StyledInput
              value={segments[i]}
              ref={segmentRefs[i]}
              onChange={e => onSegmentChange(e.target.value, i)}
              name={`${name}-${i}`}
              key={`${name}-${i}`}
              type="text"
              className={`isbn-input-${LENGTHS[i]}`}
              placeholder={'0'.repeat(LENGTHS[i])}
            />
            { i < KEYS.length - 1 && '-' }
          </span>
        ))}
      </div>
    </Container>
  )
}

export default ISBNField
