// src/lib/utils/imageImports.ts

/**
 * Dynamically imports all SVG images from the projects directory
 * Returns a map of normalized names -> processed image URL
 */
export async function loadAllProjectImages(): Promise<Record<string, string>> {
	const imageModules = import.meta.glob('/src/lib/assets/images/projects/*.svg');
	
	const imageMap: Record<string, string> = {};
	
	// Process each image module
	for (const [path, moduleLoader] of Object.entries(imageModules)) {
		try {
			const module = await moduleLoader() as { default: string };
			const filename = path.split('/').pop()?.replace('.svg', '') || '';
			const normalizedName = normalizeImageName(filename);
			
			imageMap[normalizedName] = module.default;
		} catch (error) {
			console.warn(`Failed to load image: ${path}`, error);
		}
	}
	
	return imageMap;
}

/**
 * Normalize a string to match image filenames
 * Converts to lowercase, replaces spaces/special chars with hyphens, removes extra characters
 */
function normalizeImageName(name: string): string {
	return name
		.toLowerCase()
		.trim()
		.replace(/[\s_]+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Find image URL by project name with fuzzy matching
 */
export function findImageByProjectName(imageMap: Record<string, string>, projectName: string): string | null {
	const normalizedProjectName = normalizeImageName(projectName);
	
	// Try exact match first
	if (imageMap[normalizedProjectName]) {
		return imageMap[normalizedProjectName];
	}
	
	// Try partial matches
	const availableImages = Object.keys(imageMap);
	for (const imageName of availableImages) {
		if (imageName.includes(normalizedProjectName) || normalizedProjectName.includes(imageName)) {
			return imageMap[imageName];
		}
	}
	
	// Try matching individual words
	const projectWords = normalizedProjectName.split('-').filter(word => word.length > 2);
	for (const imageName of availableImages) {
		for (const word of projectWords) {
			if (imageName.includes(word)) {
				return imageMap[imageName];
			}
		}
	}
	
	// No match found
	return null;
}