export default {
    props: {
        author: {
            type: String,
            required: true,
        },
        creators: {
            type: Array,
            required: true,
        },
        verifier: {
            type: String,
            required: false, // اختياري حتى لا يقذف خطأ لو كان فارغاً
        },
    },
    template: `
        <div class="level-authors">
            <!-- الحالة الأولى: التحقق الذاتي (Author هو نفسه Verifier وليس هناك creators) -->
            <template v-if="selfVerified">
                <div class="type-title-sm">Creator & Verifier</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            </template>

            <!-- الحالة الثانية: لا يوجد creators، ولكن قد يوجد verifier منفصل -->
            <template v-else-if="creators.length === 0">
                <div class="type-title-sm">Creator</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
                <template v-if="verifier">
                    <div class="type-title-sm">Verifier</div>
                    <p class="type-body">
                        <span>{{ verifier }}</span>
                    </p>
                </template>
            </template>

            <!-- الحالة الثالثة: وجود creators متعددين -->
            <template v-else>
                <div class="type-title-sm">Creators</div>
                <p class="type-body">
                    <template v-for="(creator, index) in creators" :key="\`creator-\$\{creator\}\`">
                        <span>{{ creator }}</span
                        ><span v-if="index < creators.length - 1">, </span>
                    </template>
                </p>
                <template v-if="verifier">
                    <div class="type-title-sm">Verifier</div>
                    <p class="type-body">
                        <span>{{ verifier }}</span>
                    </p>
                </template>
            </template>

            <!-- Publisher يظهر دائماً -->
            <div class="type-title-sm">Publisher</div>
            <p class="type-body">
                <span>{{ author }}</span>
            </p>
        </div>
    `,

    computed: {
        selfVerified() {
            // يتحقق مما إذا كان الـ verifier مطابـقاً للـ author وليس هناك creators
            return this.verifier && this.author === this.verifier && this.creators.length === 0;
        },
    },
};
