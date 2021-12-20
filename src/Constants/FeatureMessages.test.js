import { ogsmRefactor } from './FeatureMessages'

describe('Feature Messages', () => {
    test('OGSM Refactor', () => {
        expect(ogsmRefactor).toEqual({
            id: 'ogsm-refactor',
            message: 'Give us feedback on the new improved OGSM UI!',
            customComponent: 'FeedbackMessage',
            customProps: {
                link: 'https://chat.il2.dso.mil/midas/channels/feedback-ogsm-refactor'
            }
        })
    })
})
