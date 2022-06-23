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

    test('should render', async() => {
        render(<div style = {{ width: '100px', height: '100px' }}><ProductStoriesLineGraph rawData = {rawData}/></div>)

        expect(await screen.findByText('Delivered Points')).toBeInTheDocument()
        expect(screen.getByText('Delivered Stories')).toBeInTheDocument()
        expect(screen.getByText('22Jun')).toBeInTheDocument()
    })

})