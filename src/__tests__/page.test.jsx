import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '../app/[locale]/page'

describe('Home', () => {
  it('renders a page', () => {
    render(<HomePage />)
  })
})