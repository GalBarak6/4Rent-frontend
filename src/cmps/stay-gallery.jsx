export const StayGallery = ({ imgUrls }) => {
    return <div className='stay-gallery'>
        {imgUrls.map(img => <img src={require(`../assets/Images/${img}`)} alt="" key={img} className={imgUrls[0] === img ? 'main-img' : ''} />)}
    </div>
}