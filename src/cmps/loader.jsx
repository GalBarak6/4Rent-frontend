import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Loader = () => {
  const rows = Array(10).fill().map((row,idx) => (
    <section className="stay-preview" key={idx}>
      <Skeleton width={275} height={275} />
      <Skeleton count={3} />
      <Skeleton width={160} height={20} />
    </section>
  ))

  return (
    <SkeletonTheme color="#F5F5F5" highlightColor="#ffffff">
      <section className="stay-list">{rows}</section>
    </SkeletonTheme>
  )
}