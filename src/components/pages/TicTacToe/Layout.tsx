import { styled } from '@mui/system'

interface LayoutProps {
  children: any
}
export const Layout = (props: LayoutProps) => (
  <Wrapper>{props.children}</Wrapper>
)

const Wrapper = styled('div')`
  height: 100%;
  background: linear-gradient(
    180deg,
    #627a96 0%,
    #83b5c5 19.47%,
    #8dc7d4 39.07%,
    #93d2dc 82.24%,
    #95d6df 100%
  );
`
