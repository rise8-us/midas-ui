
import { render, screen } from 'Utilities/test-utils'
import { CapabilityCard } from './index'

describe('<CapabilityCard />', () => {

    test('should display data with projects', () => {
        render(
            <CapabilityCard
                title = 'cap title'
                subheader = 'submarines are snazzy'
            >
                <p>My Children</p>
            </CapabilityCard>
        )

        expect(screen.getByText('cap title')).toBeInTheDocument()
        expect(screen.getByText('submarines are snazzy')).toBeInTheDocument()
        expect(screen.getByText('My Children')).toBeInTheDocument()
    })
})