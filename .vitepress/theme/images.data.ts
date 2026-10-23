// Lists the cover and card images that actually exist in public/, so a page can point at its
// final image path and <CoverImage>/<Card> fall back to a placeholder until that file is added
export default {
  watch: ['../../public/covers/**/*.{webp,png,jpg}', '../../public/cards/**/*.{webp,png,jpg}'],
  load(watchedFiles: string[]): string[] {
    return watchedFiles.map((file) => file.slice(file.lastIndexOf('/public/') + '/public'.length))
  }
}
