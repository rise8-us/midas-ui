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

/* TODO: This is breaking with a d3 export
   Recharts v2.1.14 has a breaking change that causes jest to not be able to render.
   Updatd file extension to .xtest.js so that the jest does not pick it up.  There is
   an active issue in their Github: https://github.com/recharts/recharts/issues/2991
   that is tracking this. Once it is resolved we should be able to remove the 'x' from
   the extension and re-introduce the test. 2022-10-04
*/
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