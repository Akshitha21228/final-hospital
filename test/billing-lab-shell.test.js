import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const source=await readFile(new URL("../src/core/application.js",import.meta.url),"utf8");
const api=await readFile(new URL("../src/services/api.js",import.meta.url),"utf8");

test("Billing sidebar is isolated and contains requested routes",()=>{const nav=source.match(/const BILLING_NAV = \[([\s\S]*?)\n\];/)?.[1]||"";for(const key of ["dashboard","billing","payments","claims","ipd-billing","checkout","refunds","billing-search","tasks","alerts","reports"])assert.match(nav,new RegExp(`"${key}"`));assert.doesNotMatch(nav,/patients/);assert.match(source,/isBilling \? "billing-sidebar"/)});
test("Lab sidebar is isolated and contains requested routes",()=>{const nav=source.match(/const LAB_NAV = \[([\s\S]*?)\n\];/)?.[1]||"";for(const key of ["dashboard","lab","lab-samples","lab-processing","lab-results","lab-search","documents","tasks","alerts","reports"])assert.match(nav,new RegExp(`"${key}"`));assert.doesNotMatch(nav,/patients|queue/);assert.match(source,/isLab \? "lab-sidebar"/)});
test("Billing and Lab route permissions update without changing other role definitions",()=>{for(const key of ["payments","ipd-billing","refunds","billing-search","lab-samples","lab-processing","lab-results","lab-search"])assert.match(api,new RegExp(key));for(const id of ["local-reception","local-nurse","local-doctor","local-pharmacy"])assert.match(api,new RegExp(`id: "${id}"`))});
