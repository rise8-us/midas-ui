import { render, screen } from 'Utilities/test-utils'
import { TextSkeleton } from './index'

describe('<TextSkeleton />', () => {

    test('should render Skeleton', () => {
        render(<TextSkeleton loading = {true}/>)

        expect(screen.getByTestId('TextSkeleton')).toBeInTheDocument()
    })

    test('should render Text', () => {
        render(<TextSkeleton loading = {false} text = 'foobar'/>)

        expect(screen.getByText('foobar')).toBeInTheDocument()
    })

})