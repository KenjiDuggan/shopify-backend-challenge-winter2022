<template>
    <div class="card">
        <img :src="imgSource(imgSrc)" alt="" class="card__image">
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        id: {
            type: String,
            default: () => ''
        },
        imgSrc: {
            type: String,
            default: () => ''
        },
    },
    data() {
        return {
            s3Url: process.env.S3_BUCKET_URL,
        }
    },
    methods: {
        imgSource(key) {
            return this.s3Url + key
        }
    }
}
</script>
<style>
.card {
  border: 0px solid aqua;
  margin: 0.5rem;
  position: relative;
  height: 20rem;
  overflow: hidden;
  border-radius: 0.5rem;
  flex: 1;
  min-width: 290px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
}
 
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 80%);;
  z-index: 0;
}

.card__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 3s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  z-index: -1;
}

.card:hover .card__image {
      transform: scale(1.2);
      z-index: -1;
}
</style>