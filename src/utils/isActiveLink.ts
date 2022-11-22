export const isActiveLink = ({
  isActive,
}: {
  isActive: boolean;
}): { color: string } => ({
  color: isActive ? 'white' : '',
});
