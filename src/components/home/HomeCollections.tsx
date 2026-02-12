import CollectionHighlight from './CollectionHighlight';

const HomeCollections = () => {
    return (
        <div id="collections-highlights">
            <CollectionHighlight
                title="New Arrival"
                bannerImage="/images/new-arrival-mv0WD7ngy7FZoWXE.jpg"
                collectionTitle="Pre-Raya Release"
                collectionDescription="Get ready for Raya season, from timeless silhouettes to thoughtful details, each piece is made to complete your look for the celebration."
                category="New Arrival"
            />

            <CollectionHighlight
                title="Scarves"
                bannerImage="/images/image-1-m5KMww5a1eHrGa7j.jpg"
                collectionTitle="The Monogram Series"
                collectionDescription="Our signature monogram patterns, crafted from premium voal for your everyday elegance and comfort."
                category="Scarves"
            />

            <CollectionHighlight
                title="Prayset"
                bannerImage="/images/image-product-3-YKb36NKv2VHk924E.jpg"
                collectionTitle="Serenity Prayer Set"
                collectionDescription="Experience tranquility in every prayer with our premium prayer sets, featuring delicate lace and breathable fabrics."
                category="Pray Set"
            />

            <CollectionHighlight
                title="Hampers"
                bannerImage="/images/hampers-1-dWxvylrBJ6IBxzqB.jpg"
                collectionTitle="Gift of Gratitude"
                collectionDescription="Share the joy of giving with our curated hampers. Elegantly packaged and filled with love for your special ones."
                category="Hampers"
            />
        </div>
    );
};

export default HomeCollections;
