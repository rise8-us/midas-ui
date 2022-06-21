
import { Stack, Typography } from '@mui/material'
import { Tag } from 'Components/Tag'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectAllTags } from 'Redux/Tags/selectors'

export default function SprintIssues({ issues, noOptionsText }) {

    const tags = useSelector(selectAllTags)
    return (
        <>
            {issues.map((issue, index) => (
                <Stack
                    display = 'list-item'
                    direction = 'row'
                    spacing = {1}
                    key = {index}
                    marginLeft = {2}
                >
                    {issue.labels.filter(label => label.includes('type::')).map((label, idx) =>
                        <Tag
                            key = {idx}
                            label = {label.replace('type::', '')}
                            color = {tags.find(tag => tag.label === label)?.color ?? 'black'}
                        />
                    )}
                    <Typography display = 'inline' variant = 'body2'>
                        {issue.title}
                    </Typography>
                </Stack>
            ))}
            {issues?.length === 0 &&
                <Typography>
                    <i>{noOptionsText}</i>
                </Typography>
            }
        </>
    )
}

SprintIssues.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string)
    })),
    noOptionsText: PropTypes.string,
}

SprintIssues.defaultProps = {
    issues: [],
    noOptionsText: 'no options available',
}
