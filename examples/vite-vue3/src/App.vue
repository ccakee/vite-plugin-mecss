<template>
    <div>
        <div  mt="200"><RouterView /></div>
        <div bor="3 #ccc" w="300" m="10px auto">
            1
        </div>
        <div ml="123" mt="210px" t="1" bor-t="30px red">
            1
        </div>
        <div xxx color="#c47e34" bor-t="red 1px" fs="20px" absolute l="200" t="100" bor-b="10px green" w="30%">
            12
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
}
</script>
<style>
.div {
    margin: 1px;
}
[xxx]{
    margin-top: 3000px !important;
}
</style>