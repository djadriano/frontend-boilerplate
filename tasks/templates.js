import { base, html } from '../config'
import { src, dest, series } from 'gulp'
import del from 'del'

function copyTemplatesToRoot() {
  return src([`${html.dist.base}/**/*`])
    .pipe(dest(base.dist))
}

function cleanDistTemplates() {
  return del(html.dist.base)
}

export const copyTemplates = cb => series(copyTemplatesToRoot, cleanDistTemplates)(cb)