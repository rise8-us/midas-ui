import React from 'react'
import { render, screen, useModuleMock, fireEvent } from '../../../Utilities/test-utils'
import { Dashboard, buildCtfData, buildScopedData, combinePortfolios, combineProducts } from './index'

describe('<Dashboard>', () => {

    const selectAllActivePortfoliosNameAndIdsMock =
        useModuleMock('Redux/Portfolios/selectors', 'selectAllActivePortfoliosNameAndIds')

    const selectTagsByScopeMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByScope')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')

    test('should render', () => {
        selectAllActivePortfoliosNameAndIdsMock.mockReturnValue([{ id: 1, name: 'test' }])
        selectTagsByScopeMock.mockReturnValue([
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ])

        render(<Dashboard />, { initialState: { app: { projectJournetMap: {} } } })

        expect(screen.getByText('Portfolios')).toBeInTheDocument()
        expect(screen.getByText('ALL')).toBeInTheDocument()
        expect(screen.getByText('test')).toBeInTheDocument()

        expect(screen.getByText('label1')).toBeInTheDocument()
        expect(screen.getByText('label2')).toBeInTheDocument()

        expect(screen.getByText('No description available')).toBeInTheDocument()
    })


    test('should handle undefined selectedPortfolio', () => {
        selectAllActivePortfoliosNameAndIdsMock.mockReturnValue([{ id: 1, name: 'test' }])
        selectTagsByScopeMock.mockReturnValue([
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ])
        selectPortfolioByIdMock.mockReturnValue(undefined)

        render(<Dashboard />)
        fireEvent.click(screen.getByText('test'))

        expect(screen.getByText('No description available')).toBeInTheDocument()
    })

    test('should render singular portfolio', () => {
        selectAllActivePortfoliosNameAndIdsMock.mockReturnValue([{ id: 1, name: 'test' }])
        selectTagsByScopeMock.mockReturnValue([
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ])
        selectPortfolioByIdMock.mockReturnValue({
            id: 1,
            name: 'test',
            description: 'yolo',
            products: [],
            tagIds: [1]
        })

        render(<Dashboard />)

        fireEvent.click(screen.getByText('test'))

        expect(screen.getByText('yolo')).toBeInTheDocument()
    })

    test('should combine portfolios', () => {
        const portfolios = [
            {
                description: 'portfolio1',
                products: [{ id: 1 }, { id: 2 }]
            },
            {
                description: 'portfolio2',
                products: [{ id: 4 }]
            },
            {
                description: 'portfolio3',
                products: [{ id: 7 }, { id: 6 }]
            },
        ]

        const expectedResults = {
            description: '',
            products: [
                { id: 1 },
                { id: 2 },
                { id: 4 },
                { id: 7 },
                { id: 6 },
            ]
        }

        expect(combinePortfolios(portfolios)).toEqual(expectedResults)
    })

    test('should combine products', () => {
        const products = [
            { projects: [{ id: 1 }] },
            { projects: [{ id: 2 }, { id: 4 }] },
            { projects: [{ id: 3 }] },
        ]

        const expectedResults = [
            { id: 1 },
            { id: 2 },
            { id: 4 },
            { id: 3 },
        ]

        expect(combineProducts(products)).toEqual(expectedResults)
    })

    test('should generate scopedData', () => {
        const products = [
            { tagIds: [1] },
            { tagIds: [2] },
            { tagIds: [1] },
            { tagIds: [] },
        ]

        const scopedTags = [
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ]

        const expectedResults = [
            {
                title: 'scope::label1 - 2 (50%)',
                value: 50,
                color: '#FFFFFF'
            },
            {
                title: 'scope::label2 - 1 (25%)',
                value: 25,
                color: '#000000'
            },
            {
                title: 'missing tags for 1 products',
                value: 25,
                color: 'transparent'
            }
        ]

        expect(buildScopedData(products, scopedTags)).toEqual(expectedResults)
    })

    test('should generate ctfData', () => {
        const projects = [
            { projectJourneyMap: 7 },
            { projectJourneyMap: 0 },
            { projectJourneyMap: 1 },
            { projectJourneyMap: 3 },
        ]

        const ctfSteps = {
            COT: {
                name: 'COT',
                offset: 0,
            },
            GIT_PIPELINE: {
                name: 'GIT_PIPELINE',
                offset: 1,
            },
            CTF: {
                name: 'CTF',
                offset: 2,
            }
        }

        const expectedResults = [
            {
                name: 'COT',
                value: 25,
                count: 1
            }, {
                name: 'GIT_PIPELINE',
                value: 25,
                count: 1
            }, {
                name: 'CTF',
                value: 25,
                count: 1
            }
        ]

        expect(buildCtfData(projects, ctfSteps)).toEqual(expectedResults)
    })
})