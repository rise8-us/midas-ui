import { render, screen } from 'Utilities/test-utils'
import { ProductStoriesLineGraph } from './index'

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts')

    return {
        ...OriginalModule,
        // eslint-disable-next-line react/prop-types
        ResponsiveContainer: ({ children }) => (
            <OriginalModule.ResponsiveContainer width = {800} aspect = {3}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    }
})

describe('<ProductStoriesLineGraph />', () => {

    const rawData = [
        {
            date: '2022-06-22',
            deliveredStories: 5,
            deliveredPoints: 10,
        },
    ]

    test('should render - with data', async() => {
        render(<div style = {{ width: '100px', height: '100px' }}><ProductStoriesLineGraph rawData = {rawData}/></div>)

        expect(await screen.findByText('Points Delivered')).toBeInTheDocument()
        expect(screen.getByText('Closed Issues')).toBeInTheDocument()
        expect(screen.getByText('22Jun')).toBeInTheDocument()
    })

    test('should render - no data', async() => {
        render(<ProductStoriesLineGraph rawData = {[]}/>)

        expect(screen.getByTestId('ProductStoriesLineGraph__skeleton')).toBeInTheDocument()
    })

})