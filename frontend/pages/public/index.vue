<template>
    <div>
        <h1>Public Gallery</h1>
        <br />
        <v-row justify="center">
            <v-layout row wrap>
                <v-col 
                v-for="image in images"
                :key="image.toString()"
                cols="12" sm="4" >
                    <Card 
                    :id="image.ETag"
                    :img-src="image.Key"
                    />
                </v-col>
            </v-layout>
        </v-row>
    </div>
</template>
<script>
import Card from '../../components/Card.vue'

export default {
    components: {
        Card
    },
    async asyncData({ $axios }) { // we do our first 100 images from this fetch
        let images = await $axios.$get('/api/images/get')
        images = images.result.Contents
        return { images }
    },
}
</script>
<style>

</style>