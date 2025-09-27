export const projectImages = import.meta.glob(
    '$lib/assets/images/projects/*.svg', 
    { 
        eager: true, 
        query: { enhanced: true},
        import: 'default'
    },
) as Record<string, any>;

console.log(projectImages)

export const normalizedProjectImages: Record<string, any> = {};
for (const path in projectImages) {
    const fname = path.split('/').pop() || path
    const key = fname.replace(/\.[^/.]+$/, '');
    normalizedProjectImages[key] = projectImages[path];
}